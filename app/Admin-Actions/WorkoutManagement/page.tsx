"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Search,
  Filter,
  Dumbbell,
  Zap,
  Target,
  Heart,
  Clock,
  Calendar,
} from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

interface Workout {
  _id: string;
  title: string;
  description: string;
  duration: number;
  type: "strength" | "cardio" | "hiit" | "yoga";
  image?: string;
  video?: string;
  exercises: Exercise[];
  createdAt: string;
}

const BASE_URL = "http://localhost:5000/api/fitness";

const WorkoutManagement: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const [formData, setFormData] = useState<Partial<Workout>>({
    title: "",
    description: "",
    duration: 30,
    type: "strength",
    image: "",
    video: "",
    exercises: [{ name: "", sets: 0, reps: 0 }],
  });

  // Fetch workouts on component mount
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/workouts`);
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    }
  };

  const handleOpenModal = (workout?: Workout) => {
    if (workout) {
      setEditingWorkout(workout);
      setFormData({
        ...workout,
        exercises:
          workout.exercises.length > 0
            ? workout.exercises
            : [{ name: "", sets: 0, reps: 0 }],
      });
    } else {
      setEditingWorkout(null);
      setFormData({
        title: "",
        description: "",
        duration: 30,
        type: "strength",
        image: "",
        video: "",
        exercises: [{ name: "", sets: 0, reps: 0 }],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWorkout(null);
    setFormData({});
  };

  // const handleInputChange = (field: string, value: any, index?: number) => {
  //   if (field.startsWith("exercise_") && index !== undefined) {
  //     const [, subField] = field.split("_");
  //     setFormData((prev) => ({
  //       ...prev,
  //       exercises: prev.exercises?.map((ex, i) =>
  //         i === index ? { ...ex, [subField]: value } : ex
  //       ),
  //     }));
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [field]: value,
  //     }));
  //   }
  // };

  const handleInputChange = (field: string, value: any, index?: number) => {
    if (field.startsWith("exercise_") && index !== undefined) {
      const [, subField] = field.split("_");
      setFormData((prev) => ({
        ...prev,
        exercises: prev.exercises?.map((ex, i) =>
          i === index
            ? {
                ...ex,
                [subField]:
                  subField === "name"
                    ? value
                    : isNaN(parseInt(value)) // Handle NaN for sets/reps
                    ? 0 // Fallback to 0
                    : parseInt(value),
              }
            : ex
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]:
          field === "duration"
            ? isNaN(parseInt(value)) // Handle NaN for duration
              ? 0 // Fallback to 0
              : parseInt(value)
            : value,
      }));
    }
  };

  const addExerciseField = () => {
    setFormData((prev) => ({
      ...prev,
      exercises: [...(prev.exercises || []), { name: "", sets: 0, reps: 0 }],
    }));
  };

  const removeExerciseField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      exercises: prev.exercises?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingWorkout) {
        // Update workout
        const response = await fetch(
          `${BASE_URL}/workouts/${editingWorkout._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          const updatedWorkout = await response.json();
          setWorkouts((prev) =>
            prev.map((workout) =>
              workout._id === editingWorkout._id ? updatedWorkout : workout
            )
          );
        }
      } else {
        // Create new workout
        const response = await fetch(`${BASE_URL}/workouts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const newWorkout = await response.json();
          setWorkouts((prev) => [newWorkout, ...prev]);
        }
      }
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save workout:", error);
    }
  };

  const handleDelete = async (workoutId: string) => {
    if (confirm("Are you sure you want to delete this workout?")) {
      try {
        const response = await fetch(`${BASE_URL}/workouts/${workoutId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setWorkouts((prev) =>
            prev.filter((workout) => workout._id !== workoutId)
          );
        }
      } catch (error) {
        console.error("Failed to delete workout:", error);
      }
    }
  };

  const getWorkoutIcon = (type: string) => {
    switch (type) {
      case "strength":
        return Dumbbell;
      case "hiit":
        return Zap;
      case "yoga":
        return Target;
      case "cardio":
        return Heart;
      default:
        return Target;
    }
  };

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch =
      workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || workout.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {workouts.length}
              </div>
              <div className="text-gray-500">Total Workouts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Workout Management Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Section Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200 rounded-t-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Dumbbell className="w-6 h-6 text-blue-600" />
              Workout Management
            </h2>

            <button
              onClick={() => handleOpenModal()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add New Workout
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search workouts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="hiit">HIIT</option>
                <option value="yoga">Yoga</option>
              </select>
            </div>
          </div>
        </div>

        {/* Workouts Grid */}
        <div className="p-6">
          {filteredWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map((workout) => {
                const WorkoutIcon = getWorkoutIcon(workout.type);
                return (
                  <div
                    key={workout._id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="relative">
                      {workout.image ? (
                        <img
                          src={workout.image}
                          alt={workout.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <WorkoutIcon className="w-16 h-16 text-white" />
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {workout.duration} min
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <WorkoutIcon className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600 capitalize">
                          {workout.type}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">
                          {workout.exercises.length} exercises
                        </span>
                      </div>

                      <h3 className="text-lg font-bold mb-2 text-gray-800">
                        {workout.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {workout.description}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(workout)}
                          className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(workout._id)}
                          className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No workouts found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search criteria or create a new workout.
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Create First Workout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Create/Edit Workout */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">
                  {editingWorkout ? "Edit Workout" : "Create New Workout"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workout Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.duration || 30}
                    onChange={(e) =>
                      handleInputChange("duration", parseInt(e.target.value))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workout Type *
                  </label>
                  <select
                    value={formData.type || "strength"}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="strength">Strength</option>
                    <option value="cardio">Cardio</option>
                    <option value="hiit">HIIT</option>
                    <option value="yoga">Yoga</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image || ""}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL
                  </label>
                  <input
                    type="url"
                    value={formData.video || ""}
                    onChange={(e) => handleInputChange("video", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/video.mp4"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Exercises *
                  </label>
                  <button
                    type="button"
                    onClick={addExerciseField}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Exercise
                  </button>
                </div>
                {formData.exercises?.map((exercise, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 mb-3 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeExerciseField(index)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Exercise Name *
                        </label>
                        <input
                          type="text"
                          value={exercise.name}
                          onChange={(e) =>
                            handleInputChange(
                              "exercise_name",
                              e.target.value,
                              index
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sets
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={exercise.sets}
                          onChange={(e) =>
                            handleInputChange(
                              "exercise_sets",
                              parseInt(e.target.value),
                              index
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reps
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={exercise.reps}
                          onChange={(e) =>
                            handleInputChange(
                              "exercise_reps",
                              parseInt(e.target.value),
                              index
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingWorkout ? "Update Workout" : "Create Workout"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default WorkoutManagement;
