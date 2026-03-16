"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  CheckCircle,
  Timer,
  RotateCcw,
  Dumbbell,
  Target,
  Clock,
  Activity,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  muscleGroup?: string;
}

interface Workout {
  _id: string;
  title: string;
  exercises: Exercise[];
}

const WorkoutProgressTracker: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseProgress, setExerciseProgress] = useState({});
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(
    new Set<string>()
  );

  useEffect(() => {
    const fetchWorkout = () => {
      try {
        setLoading(true);
        const workoutData = localStorage.getItem(`workout-${params.id}`);
        if (!workoutData) {
          throw new Error("Workout not found in local storage");
        }
        const workout: Workout = JSON.parse(workoutData);
        setSelectedWorkout(workout);
      } catch (err) {
        setError("Error loading workout. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchWorkout();
    }
  }, [params.id]);

  useEffect(() => {
    if (!selectedWorkout) return;

    const initialProgress = {};
    selectedWorkout.exercises.forEach((exercise, index) => {
      initialProgress[index] = {
        sets: Array(exercise.sets)
          .fill()
          .map(() => ({
            completed: false,
          })),
        currentSet: 0,
      };
    });
    setExerciseProgress(initialProgress);
    setCurrentExerciseIndex(0);
    setCompletedExercises(new Set());
    setWorkoutStarted(false);
  }, [selectedWorkout]);

  useEffect(() => {
    let interval;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer((prev) => prev - 1);
      }, 1000);
    } else if (restTimer === 0 && isResting) {
      setIsResting(false);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !selectedWorkout) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600">
        {error || "Workout not found"}
      </div>
    );
  }

  const currentExercise = selectedWorkout.exercises[currentExerciseIndex];
  const currentProgress = exerciseProgress[currentExerciseIndex] || {
    sets: [],
    currentSet: 0,
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: string,
    value: any
  ) => {
    setExerciseProgress((prev) => ({
      ...prev,
      [exerciseIndex]: {
        ...prev[exerciseIndex],
        sets: prev[exerciseIndex].sets.map((set, index) =>
          index === setIndex ? { ...set, [field]: value } : set
        ),
      },
    }));
  };

  const completeSet = (exerciseIndex: number, setIndex: number) => {
    updateSet(exerciseIndex, setIndex, "completed", true);

    setExerciseProgress((prev) => ({
      ...prev,
      [exerciseIndex]: {
        ...prev[exerciseIndex],
        currentSet: Math.min(setIndex + 1, prev[exerciseIndex].sets.length - 1),
      },
    }));

    setRestTimer(60);
    setIsResting(true);

    const updatedSets = exerciseProgress[exerciseIndex].sets.map((set, index) =>
      index === setIndex ? { ...set, completed: true } : set
    );

    if (updatedSets.every((set) => set.completed)) {
      setCompletedExercises(
        (prev) => new Set([...prev, String(exerciseIndex)])
      );
    }
  };

  const startWorkout = () => {
    setWorkoutStarted(true);
  };

  const nextExercise = () => {
    if (currentExerciseIndex < selectedWorkout.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setIsResting(false);
      setRestTimer(0);
    }
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
      setIsResting(false);
      setRestTimer(0);
    }
  };

  const resetWorkout = () => {
    setWorkoutStarted(false);
    setCurrentExerciseIndex(0);
    setIsResting(false);
    setRestTimer(0);
    setCompletedExercises(new Set());

    const resetProgress = {};
    selectedWorkout.exercises.forEach((exercise, index) => {
      resetProgress[index] = {
        sets: Array(exercise.sets)
          .fill()
          .map(() => ({
            completed: false,
          })),
        currentSet: 0,
      };
    });
    setExerciseProgress(resetProgress);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getWorkoutProgress = () => {
    const totalExercises = selectedWorkout.exercises.length;
    const completed = completedExercises.size;
    return Math.round((completed / totalExercises) * 100);
  };

  // Check if workout is completed
  const isWorkoutCompleted =
    completedExercises.size === selectedWorkout.exercises.length &&
    workoutStarted;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="p-6">
        {/* Show completion screen when workout is completed */}
        {isWorkoutCompleted ? (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Workout Complete!
            </h3>
            <p className="text-green-600 font-medium mb-6">
              Great job finishing your {selectedWorkout.title} workout!
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/workout")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Back to Workouts
              </button>
              <button
                onClick={resetWorkout}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Start New Workout
              </button>
            </div>
          </div>
        ) : !workoutStarted ? (
          /* Pre-workout screen */
          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {selectedWorkout.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {selectedWorkout.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Activity className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-gray-800 font-semibold">
                          {exercise.name}
                        </h3>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Target className="w-4 h-4" />
                        <span>
                          {exercise.sets} sets × {exercise.reps} reps
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={startWorkout}
                className="bg-blue-600 text-white py-4 px-8 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 mx-auto text-lg"
              >
                <Play className="w-5 h-5" />
                Start Workout
              </button>
            </div>
          </div>
        ) : (
          /* Active workout screen */
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => router.push("/workout")}
              className="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Back to Workouts
            </button>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-medium">
                  Workout Progress
                </span>
                <span className="text-blue-600 font-bold">
                  {getWorkoutProgress()}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getWorkoutProgress()}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                <span>
                  Exercise {currentExerciseIndex + 1} of{" "}
                  {selectedWorkout.exercises.length}
                </span>
                <span>
                  {completedExercises.size} of{" "}
                  {selectedWorkout.exercises.length} completed
                </span>
              </div>
            </div>

            {isResting && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Timer className="mr-2 text-orange-600" size={24} />
                  <span className="text-orange-600 font-semibold">
                    Rest Time
                  </span>
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-4">
                  {formatTime(restTimer)}
                </div>
                <button
                  onClick={() => setIsResting(false)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  Skip Rest
                </button>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {currentExercise.name}
                  </h2>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-600 text-sm font-medium">
                      {currentExercise.muscleGroup || "N/A"}
                    </span>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span className="text-sm">
                        {currentExercise.sets} sets
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <span className="text-sm">
                        {currentExercise.reps} reps
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-500 text-sm">Exercise</div>
                  <div className="text-xl font-bold text-gray-800">
                    {currentExerciseIndex + 1} /{" "}
                    {selectedWorkout.exercises.length}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {currentProgress.sets.map((set, setIndex) => (
                  <div
                    key={setIndex}
                    className={`border-2 rounded-lg p-4 transition-all ${
                      set.completed
                        ? "border-green-200 bg-green-50"
                        : setIndex === currentProgress.currentSet
                        ? "border-blue-200 bg-blue-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold text-gray-800">
                          Set {setIndex + 1}
                        </span>
                        {set.completed && (
                          <CheckCircle className="text-green-600" size={20} />
                        )}
                        <span className="text-gray-600 text-sm">
                          Target: {currentExercise.reps} reps
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() =>
                            completeSet(currentExerciseIndex, setIndex)
                          }
                          disabled={set.completed}
                          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                            set.completed
                              ? "bg-green-600 text-white cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {set.completed ? "Completed" : "Complete Set"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center gap-2">
              <button
                onClick={previousExercise}
                disabled={currentExerciseIndex === 0}
                className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Previous Exercise
              </button>

              <button
                onClick={resetWorkout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Workout
              </button>

              <button
                onClick={nextExercise}
                disabled={
                  currentExerciseIndex === selectedWorkout.exercises.length - 1
                }
                className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Next Exercise
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutProgressTracker;