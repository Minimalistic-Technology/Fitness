"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Edit3,
  Save,
  X,
  Heart,
  Clock,
  Play,
  ChevronRight,
  Dumbbell,
  Zap,
  Target,
  Trophy,
} from "lucide-react";
// axios removed for dummy data
import { useAuth } from "../context/context";
import { useRouter } from "next/navigation";

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  description: string;
  totalWorkouts: number;
  totalMinutes: number;
}

interface Workout {
  _id: string;
  title: string;
  description: string;
  duration: number;
  image?: string;
  type: "strength" | "cardio" | "hiit" | "yoga";
}

const UserProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    description: "",
    totalWorkouts: 0,
    totalMinutes: 0,
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<Workout[]>([]);
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.replace("/login");
      } else {
        fetchProfile();
      }
    }
  }, [token, router, loading]);

  const fetchProfile = async () => {
    const dummyUser: UserProfile = {
      _id: "admin-id",
      firstName: "Admin",
      lastName: "User",
      email: "admin",
      phoneNumber: "1234567890",
      description: "Fitness enthusiast and project administrator.",
      totalWorkouts: 15,
      totalMinutes: 450,
    };
    setUserProfile(dummyUser);
    setEditedProfile(dummyUser);
    setFavoriteWorkouts([
      {
        _id: "1",
        title: "Full Body Strength",
        description: "A comprehensive strength workout for all major muscle groups.",
        duration: 45,
        type: "strength",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"
      }
    ]);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(userProfile);
  };

  const handleSave = async () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const removeFavorite = async (workoutId: string) => {
    setFavoriteWorkouts((prev) =>
      prev.filter((workout) => workout._id !== workoutId)
    );
    alert("Removed from Favorites");
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-xl">
                  {userProfile.firstName.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
              </div>

              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold mb-2">
                  {userProfile.firstName} {userProfile.lastName}
                </h1>
                <p className="text-blue-100 text-lg mb-4">
                  {userProfile.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Information */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <User className="w-6 h-6 text-blue-600" />
                    Profile Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-900">
                            {userProfile.firstName}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-900">
                            {userProfile.lastName}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                          <Mail className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-900">
                            {userProfile.email}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedProfile.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                          <Phone className="w-5 h-5 text-gray-500" />
                          <span className="text-gray-900">
                            {userProfile.phoneNumber || "Not provided"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editedProfile.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                        />
                      ) : (
                        <div className="flex items-start gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-900">
                            {userProfile.description ||
                              "No description provided."}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Fitness Stats
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Workouts:</span>
                          <span className="font-semibold text-blue-600">
                            {userProfile.totalWorkouts}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Favorite Workouts:
                          </span>
                          <span className="font-semibold text-blue-600">
                            {favoriteWorkouts.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Favorite Workouts */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Heart className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold text-gray-800">
                Favorite Workouts
              </h2>
            </div>

            {favoriteWorkouts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteWorkouts.map((workout) => {
                  const WorkoutIcon = getWorkoutIcon(workout.type);
                  return (
                    <div
                      key={workout._id}
                      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative">
                        {workout.image ? (
                          <img
                            src={workout.image}
                            alt={workout.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <WorkoutIcon className="w-16 h-16 text-white" />
                          </div>
                        )}

                        <button
                          onClick={() => removeFavorite(workout._id)}
                          className="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-lg"
                        >
                          <Heart className="w-5 h-5 text-red-500 fill-current" />
                        </button>

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
                        </div>

                        <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                          {workout.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {workout.description}
                        </p>

                        <button
                          onClick={() =>
                            router.push(`/Workout-Progress/${workout._id}`)
                          }
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Start Workout
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Favorite Workouts Yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Start exploring workouts and add them to your favorites!
                </p>
                <a
                  href="/workout"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Explore Workouts
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Keep Pushing Your Limits!</h2>
          <p className="text-xl mb-8 text-blue-100">
            Your fitness journey is just getting started. Discover new workouts
            and achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/workout")}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200"
            >
              Browse Workouts
            </button>
            <button
              onClick={() => router.push("/progress")}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              View Progress
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfilePage;
