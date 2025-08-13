"use client";

import React, { useState } from "react";
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

interface Workout {
  _id: string;
  title: string;
  description: string;
  duration: number;
  type: "strength" | "cardio" | "hiit" | "yoga";
  image?: string;
  exercises: number;
  createdAt: string;
}

const WorkoutManagement: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      _id: "1",
      title: "Morning HIIT Blast",
      description:
        "High-intensity interval training to kickstart your day with energy and burn calories effectively.",
      duration: 30,
      type: "hiit",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      exercises: 8,
      createdAt: "2024-01-15",
    },
    {
      _id: "2",
      title: "Strength Builder Pro",
      description:
        "Build muscle and increase strength with this comprehensive full-body workout routine.",
      duration: 45,
      type: "strength",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
      exercises: 12,
      createdAt: "2024-01-10",
    },
    {
      _id: "3",
      title: "Zen Yoga Flow",
      description:
        "Relax and rejuvenate with this gentle yoga session focused on flexibility and mindfulness.",
      duration: 60,
      type: "yoga",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
      exercises: 15,
      createdAt: "2024-01-08",
    },
  ]);

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
    exercises: 1,
  });

  const handleOpenModal = (workout?: Workout) => {
    if (workout) {
      setEditingWorkout(workout);
      setFormData(workout);
    } else {
      setEditingWorkout(null);
      setFormData({
        title: "",
        description: "",
        duration: 30,
        type: "strength",
        image: "",
        exercises: 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWorkout(null);
    setFormData({});
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingWorkout) {
      // Update workout
      setWorkouts((prev) =>
        prev.map((workout) =>
          workout._id === editingWorkout._id
            ? { ...workout, ...formData }
            : workout
        )
      );
    } else {
      // Create new workout
      const newWorkout: Workout = {
        ...formData,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      } as Workout;

      setWorkouts((prev) => [newWorkout, ...prev]);
    }

    handleCloseModal();
  };

  const handleDelete = (workoutId: string) => {
    if (confirm("Are you sure you want to delete this workout?")) {
      setWorkouts((prev) =>
        prev.filter((workout) => workout._id !== workoutId)
      );
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
                          {workout.exercises} exercises
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

            <div className="p-6 space-y-6">
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
                    Number of Exercises *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.exercises || 1}
                    onChange={(e) =>
                      handleInputChange("exercises", parseInt(e.target.value))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
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
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default WorkoutManagement;
