"use client";

import React from "react";
import WorkoutManagement from "../Admin-Actions/WorkoutManagement/page"; // <-- Import your workout component


const AdminWorkoutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <span className="text-sm opacity-80">
            Manage workouts and content
          </span>
        </div>
      </header>
     
      {/* Main Content */}
      <WorkoutManagement />
    </div>
  );
};

export default AdminWorkoutPage;
