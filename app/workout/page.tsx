    "use client";

    import React, { useState } from 'react';
    import { Play, Clock, Users, Target, Filter, Star, ChevronRight, Dumbbell, Heart, Zap, X, PlayCircle, Repeat, Timer } from 'lucide-react';

    interface Workout {
        id: number;
        title: string;
        description: string;
        duration: string;
        difficulty: string;
        category: string;
        rating: number;
        participants: string;
        image: string;
        trainer: string;
        equipment: string;
        videoUrl: string;
        sets: Array<{
            name: string;
            sets: number;
            duration: string;
            reps?: string | null;
            rest?: string | null;
        }>;
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
                className="p-2 hover:bg-gray-100 rounded-full transition-colors "
            >
                <X className="w-6 h-6" />
            </button>
            </div>
            
            <div className="p-6">
            {/* Video Section */}
            <div className="mb-6">
                <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-4">
                <iframe
                    src={workout.videoUrl}
                    title={workout.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                />
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{workout.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span className="capitalize">{workout.difficulty}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{workout.participants} participants</span>
                </div>
                </div>
            </div>

            {/* Workout Details */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Workout Overview</h3>
                <p className="text-gray-600 mb-4">{workout.description}</p>
                
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                    <span className="text-gray-600">Trainer:</span>
                    <span className="font-medium">{workout.trainer}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-600">Equipment:</span>
                    <span className="font-medium">{workout.equipment}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{workout.rating}</span>
                    </div>
                    </div>
                </div>
                </div>

                <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Workout Structure</h3>
                <div className="space-y-3">
                    {workout.sets.map((set, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800">{set.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Repeat className="w-4 h-4" />
                            <span>{set.sets} sets</span>
                        </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Timer className="w-4 h-4" />
                            <span>{set.duration}</span>
                        </div>
                        {set.reps && (
                            <span>{set.reps} reps</span>
                        )}
                        {set.rest && (
                            <span>Rest: {set.rest}</span>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {/* Action Buttons */}
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

    // Main Workout Page Component
    export default function WorkoutPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const featuredWorkouts = [
        {
        id: 1,
        title: "Full Body HIIT Blast",
        description: "High-intensity interval training to torch calories and build strength",
        duration: "30 min",
        difficulty: "intermediate",
        category: "hiit",
        rating: 4.8,
        participants: "12.5k",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
        trainer: "Mike Chen",
        equipment: "Bodyweight",
        videoUrl: "https://www.youtube.com/embed/UBMk30rjy0o",
        sets: [
            { name: "Warm-up", sets: 1, duration: "5 min", reps: null, rest: null },
            { name: "HIIT Circuit", sets: 4, duration: "45 sec", reps: null, rest: "15 sec" },
            { name: "Strength Rounds", sets: 3, duration: "60 sec", reps: "12-15", rest: "30 sec" },
            { name: "Cool Down", sets: 1, duration: "5 min", reps: null, rest: null }
        ]
        },
        {
        id: 2,
        title: "Morning Yoga Flow",
        description: "Gentle yoga sequence to energize your morning and improve flexibility",
        duration: "45 min",
        difficulty: "beginner",
        category: "yoga",
        rating: 4.9,
        participants: "8.2k",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
        trainer: "Sarah Williams",
        equipment: "Yoga Mat",
        videoUrl: "https://www.youtube.com/embed/v7AYKMP6rOE",
        sets: [
            { name: "Breathing & Centering", sets: 1, duration: "5 min", reps: null, rest: null },
            { name: "Sun Salutations", sets: 3, duration: "8 min", reps: "5 rounds", rest: "30 sec" },
            { name: "Standing Poses", sets: 1, duration: "15 min", reps: null, rest: null },
            { name: "Floor Poses", sets: 1, duration: "12 min", reps: null, rest: null },
            { name: "Savasana", sets: 1, duration: "5 min", reps: null, rest: null }
        ]
        },
        {
        id: 3,
        title: "Upper Body Strength",
        description: "Build muscle and definition in your arms, chest, and shoulders",
        duration: "40 min",
        difficulty: "advanced",
        category: "strength",
        rating: 4.7,
        participants: "15.3k",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=250&fit=crop",
        trainer: "David Rodriguez",
        equipment: "Dumbbells",
        videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4",
        sets: [
            { name: "Dynamic Warm-up", sets: 1, duration: "8 min", reps: null, rest: null },
            { name: "Chest & Triceps", sets: 4, duration: "3 min", reps: "8-12", rest: "60 sec" },
            { name: "Back & Biceps", sets: 4, duration: "3 min", reps: "8-12", rest: "60 sec" },
            { name: "Shoulders", sets: 3, duration: "2 min", reps: "10-15", rest: "45 sec" },
            { name: "Finisher Circuit", sets: 2, duration: "5 min", reps: null, rest: "90 sec" }
        ]
        }
    ];

    const workoutCategories = [
        { id: 'all', name: 'All Workouts', icon: Target },
        { id: 'strength', name: 'Strength', icon: Dumbbell },
        { id: 'cardio', name: 'Cardio', icon: Heart },
        { id: 'hiit', name: 'HIIT', icon: Zap },
        { id: 'yoga', name: 'Yoga', icon: Target },
    ];

    const allWorkouts = [
        ...featuredWorkouts,
        {
        id: 4,
        title: "Fat Burning Cardio",
        description: "High-energy cardio workout to maximize calorie burn",
        duration: "35 min",
        difficulty: "intermediate",
        category: "cardio",
        rating: 4.6,
        participants: "9.8k",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=250&fit=crop",
        trainer: "Emma Thompson",
        equipment: "None",
        videoUrl: "https://www.youtube.com/embed/gC_L9qAHVJ8",
        sets: [
            { name: "Warm-up", sets: 1, duration: "5 min", reps: null, rest: null },
            { name: "Cardio Blast", sets: 5, duration: "4 min", reps: null, rest: "1 min" },
            { name: "Recovery", sets: 1, duration: "3 min", reps: null, rest: null },
            { name: "Final Sprint", sets: 3, duration: "2 min", reps: null, rest: "30 sec" }
        ]
        },
        {
        id: 5,
        title: "Core Power Hour",
        description: "Intensive core workout to build a strong foundation",
        duration: "20 min",
        difficulty: "intermediate",
        category: "strength",
        rating: 4.8,
        participants: "11.2k",
        image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=250&fit=crop",
        trainer: "Alex Johnson",
        equipment: "Mat",
        videoUrl: "https://www.youtube.com/embed/3p8EBPVZ2Iw",
        sets: [
            { name: "Core Activation", sets: 1, duration: "3 min", reps: null, rest: null },
            { name: "Plank Variations", sets: 3, duration: "45 sec", reps: null, rest: "15 sec" },
            { name: "Ab Circuit", sets: 4, duration: "60 sec", reps: "15-20", rest: "20 sec" },
            { name: "Core Finisher", sets: 2, duration: "90 sec", reps: null, rest: "30 sec" }
        ]
        },
        {
        id: 6,
        title: "Beginner's Strength",
        description: "Perfect introduction to strength training for newcomers",
        duration: "25 min",
        difficulty: "beginner",
        category: "strength",
        rating: 4.9,
        participants: "6.5k",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=250&fit=crop",
        trainer: "Lisa Park",
        equipment: "Light Weights",
        videoUrl: "https://www.youtube.com/embed/R6gZoAzAhCg",
        sets: [
            { name: "Mobility Warm-up", sets: 1, duration: "5 min", reps: null, rest: null },
            { name: "Upper Body Basics", sets: 2, duration: "4 min", reps: "10-12", rest: "60 sec" },
            { name: "Lower Body Basics", sets: 2, duration: "4 min", reps: "10-12", rest: "60 sec" },
            { name: "Full Body Flow", sets: 2, duration: "3 min", reps: "8-10", rest: "45 sec" }
        ]
        }
    ];

    const filteredWorkouts = allWorkouts.filter((workout: Workout) => {
        const categoryMatch = selectedCategory === 'all' || workout.category === selectedCategory;
        const difficultyMatch = selectedDifficulty === 'all' || workout.difficulty === selectedDifficulty;
        return categoryMatch && difficultyMatch;
    });

    const getDifficultyColor = (difficulty: string): string => {
        switch (difficulty) {
        case 'beginner': return 'text-green-600 bg-green-100';
        case 'intermediate': return 'text-yellow-600 bg-yellow-100';
        case 'advanced': return 'text-red-600 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
        }
    };

    const handleStartWorkout = (workout: Workout) => {
        setSelectedWorkout(workout);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedWorkout(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-16">
            <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                Transform Your Body with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> Expert Workouts</span>
                </h1>
                <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Access hundreds of professional workout programs designed by certified trainers. 
                From beginner-friendly routines to advanced challenges.
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>500k+ Active Members</span>
                </div>
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    <span>200+ Workout Programs</span>
                </div>
                <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    <span>4.8/5 Average Rating</span>
                </div>
                </div>
            </div>
            </div>
        </section>

        {/* Featured Workouts */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
            <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">Featured Workouts</h2>
                <p className="text-gray-600 text-lg">Our most popular and effective workout programs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredWorkouts.map((workout) => (
                <div key={workout.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative">
                    <img 
                        src={workout.image} 
                        alt={workout.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(workout.difficulty)}`}>
                        {workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}
                        </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {workout.duration}
                    </div>
                    </div>
                    
                    <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{workout.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{workout.description}</p>
                    
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <span>by {workout.trainer}</span>
                        <span>{workout.equipment}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{workout.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        {workout.participants}
                        </div>
                    </div>
                    
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

        {/* Categories Section */}
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

        {/* Filters and All Workouts */}
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">All Workouts</h2>
                
                <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Difficulty:</span>
                    <select 
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    </select>
                </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.map((workout) => (
                <div key={workout.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative">
                    <img 
                        src={workout.image} 
                        alt={workout.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
                    </div>
                    </div>
                    
                    <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(workout.difficulty)}`}>
                        {workout.difficulty}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {workout.duration}
                        </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">{workout.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{workout.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>by {workout.trainer}</span>
                        <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{workout.rating}</span>
                        </div>
                    </div>
                    
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

        {/* CTA Section */}
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

        {/* Video Modal */}
        <VideoModal 
            workout={selectedWorkout}
            isOpen={isModalOpen}
            onClose={closeModal}
        />
        </div>
    );
    }