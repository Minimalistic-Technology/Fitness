"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Clock,
  Users,
  Target,
  Filter,
  Star,
  ChevronRight,
  Dumbbell,
  Heart,
  Zap,
  X,
  PlayCircle,
  Repeat,
  Timer,
} from "lucide-react";
import { useRouter } from "next/navigation";
// axios removed for dummy data
import { useAuth } from "../context/context"; // Assuming this provides the auth token

interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

interface Workout {
  _id: string;
  title: string;
  description: string;
  duration: number;
  image?: string;
  video?: string;
  type: "strength" | "cardio" | "hiit" | "yoga";
  exercises: Exercise[];
}

interface VideoModalProps {
  workout: Workout | null;
  isOpen: boolean;
  onClose: () => void;
  onStartWorkout: (workout: Workout) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({
  workout,
  isOpen,
  onClose,
  onStartWorkout,
}) => {
  const { token } = useAuth(); // Get auth token from context
  const [isFavorite, setIsFavorite] = useState<boolean>(false); // State to track favorite status
  const [loadingFavorite, setLoadingFavorite] = useState<boolean>(false); // State for loading

  // Check if the workout is already in favorites when modal opens
  useEffect(() => {
    // Dummy check for favorite status
    setIsFavorite(false);
  }, [workout]);

  // Handle adding/removing from favorites
  const handleFavoriteToggle = async () => {
    if (!workout) return;
    setIsFavorite(!isFavorite);
    alert(isFavorite ? "Removed from Favorites" : "Added to Favorites");
  };

  if (!isOpen || !workout) return null;

  const getEmbedUrl = (url: string): string => {
    if (url.includes("youtu.be")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0];
    } else if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/").split("&")[0];
    }
    return url;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-gray-800">{workout.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 relative z-0">
          <div className="mb-6">
            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-4">
              {workout.video ? (
                workout.video.includes("youtu") ? (
                  <iframe
                    src={getEmbedUrl(workout.video)}
                    title={workout.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    src={workout.video}
                    controls
                    className="w-full h-full object-contain"
                    autoPlay
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No video available
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{workout.duration} min</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Workout Overview
              </h3>
              <p className="text-gray-600 mb-4">{workout.description}</p>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Exercises
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {workout.exercises.map((exercise, index) => (
                  <li key={index}>
                    {exercise.name} - {exercise.sets} sets x {exercise.reps}{" "}
                    reps
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => onStartWorkout(workout)}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Start Workout
            </button>
            <button
              onClick={handleFavoriteToggle}
              disabled={loadingFavorite}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                isFavorite
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
              />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkoutsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      const dummyWorkouts: Workout[] = [
        {
          _id: "1",
          title: "Full Body Strength",
          description: "A comprehensive strength workout for all major muscle groups.",
          duration: 45,
          type: "strength",
          exercises: [
            { name: "Squats", sets: 3, reps: "12" },
            { name: "Push ups", sets: 3, reps: "15" },
          ],
          image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"
        },
        {
          _id: "2",
          title: "Cardio Blast",
          description: "High intensity cardio to get your heart rate up.",
          duration: 30,
          type: "cardio",
          exercises: [
            { name: "Jumping Jacks", sets: 4, reps: "30 sec" },
            { name: "Burpees", sets: 3, reps: "10" },
          ],
          image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80"
        },
        {
          _id: "3",
          title: "Yoga Flow",
          description: "Relaxing yoga flow for flexibility and mindfulness.",
          duration: 20,
          type: "yoga",
          exercises: [
            { name: "Sun Salutation", sets: 3, reps: "5 mins" },
            { name: "Warrior Pose", sets: 2, reps: "1 min each side" },
          ],
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
        }
      ];
      setWorkouts(dummyWorkouts);
      setLoading(false);
    };

    fetchWorkouts();
  }, []);

  const workoutCategories = [
    { id: "all", name: "All Workouts", icon: Target },
    { id: "strength", name: "Strength", icon: Dumbbell },
    { id: "cardio", name: "Cardio", icon: Heart },
    { id: "hiit", name: "HIIT", icon: Zap },
    { id: "yoga", name: "Yoga", icon: Target },
  ];

  const filteredWorkouts = workouts.filter((workout: Workout) => {
    const categoryMatch =
      selectedCategory === "all" || workout.type === selectedCategory;
    const difficultyMatch = selectedDifficulty === "all";
    return categoryMatch && difficultyMatch;
  });

  const handleStartWorkout = (workout: Workout) => {
    localStorage.setItem(`workout-${workout._id}`, JSON.stringify(workout));
    router.push(`/Workout-Progress/${workout._id}`);
  };

  const handleOpenModal = (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorkout(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Transform Your Body with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                {" "}
                Expert Workouts
              </span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Access professional workout programs designed by certified
              trainers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Choose Your Workout Style
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {workoutCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              {selectedCategory === "all"
                ? "All Workouts"
                : `${
                    selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)
                  } Workouts`}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.length > 0 ? (
              filteredWorkouts.map((workout: Workout) => (
                <div
                  key={workout._id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative">
                    {workout.image ? (
                      <img
                        src={workout.image}
                        alt={workout.title}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                        No image available
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {workout.duration} min
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                      {workout.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {workout.description}
                    </p>

                    <button
                      onClick={() => handleOpenModal(workout)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      Start Now
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600">
                No workouts found for this category.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of members who have transformed their lives with our
            programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-200">
              View Plans
            </button>
          </div>
        </div>
      </section>

      <VideoModal
        workout={selectedWorkout}
        isOpen={isModalOpen}
        onClose={closeModal}
        onStartWorkout={handleStartWorkout}
      />
    </div>
  );
};

export default WorkoutsPage;