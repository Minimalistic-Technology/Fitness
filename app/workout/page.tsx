"use client";

import React, { useState, useEffect } from 'react';
import { Play, Clock, Users, Target, Filter, Star, ChevronRight, Dumbbell, Heart, Zap, X, PlayCircle, Repeat, Timer } from 'lucide-react';

interface Workout {
    _id: string;
    title: string;
    description: string;
    duration: number;
}

const VideoModal = ({ workout, isOpen, onClose }: { workout: Workout | null; isOpen: boolean; onClose: () => void }) => {
    if (!isOpen || !workout) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-2xl">
                    <h2 className="text-2xl font-bold text-gray-800">{workout.title}</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-6">
                    <div className="mb-6">
                        <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-4">
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                Video placeholder (API doesn't provide video URL)
                            </div>
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
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">Workout Overview</h3>
                            <p className="text-gray-600 mb-4">{workout.description}</p>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
                        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            <PlayCircle className="w-5 h-5" />
                            Start Workout
                        </button>
                        <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Add to Favorites
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function WorkoutPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/fitness/workouts');
                if (!response.ok) {
                    throw new Error('Failed to fetch workouts');
                }
                const data = await response.json();
                setWorkouts(data);
            } catch (err) {
                setError('Error fetching workouts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    const workoutCategories = [
        { id: 'all', name: 'All Workouts', icon: Target },
        { id: 'strength', name: 'Strength', icon: Dumbbell },
        { id: 'cardio', name: 'Cardio', icon: Heart },
        { id: 'hiit', name: 'HIIT', icon: Zap },
        { id: 'yoga', name: 'Yoga', icon: Target },
    ];

    const filteredWorkouts = workouts.filter((workout: Workout) => {
        const categoryMatch = selectedCategory === 'all'; // Category filtering not implemented in API
        const difficultyMatch = selectedDifficulty === 'all'; // Difficulty filtering not implemented in API
        return categoryMatch && difficultyMatch;
    });

    const featuredWorkouts = filteredWorkouts.slice(0, 3); // Take first 3 as featured

    const handleStartWorkout = (workout: Workout) => {
        setSelectedWorkout(workout);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedWorkout(null);
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-6 leading-tight">
                            Transform Your Body with
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> Expert Workouts</span>
                        </h1>
                        <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                            Access professional workout programs designed by certified trainers.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 text-gray-800">Featured Workouts</h2>
                        <p className="text-gray-600 text-lg">Our most popular workout programs</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredWorkouts.map((workout) => (
                            <div key={workout._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="relative">
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                        Image placeholder
                                    </div>
                                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {workout.duration} min
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-gray-800">{workout.title}</h3>
                                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{workout.description}</p>
                                    
                                    <button 
                                        onClick={() => handleStartWorkout(workout)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        Start Workout
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Choose Your Workout Style</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {workoutCategories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                                        selectedCategory === category.id
                                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
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
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">All Workouts</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredWorkouts.map((workout) => (
                            <div key={workout._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                <div className="relative">
                                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                                        Image placeholder
                                    </div>
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                        <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
                                    </div>
                                </div>
                                
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            {workout.duration} min
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">{workout.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{workout.description}</p>
                                    
                                    <button 
                                        onClick={() => handleStartWorkout(workout)}
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                                    >
                                        Start Now
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
                    <p className="text-xl mb-8 text-blue-100">Join thousands of members who have transformed their lives with our programs</p>
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
            />
        </div>
    );
}