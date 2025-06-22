"use client";
    import { Geist, Geist_Mono } from "next/font/google";
    import { ReactNode } from "react";
    import Link from "next/link";
    import { useRouter } from "next/navigation";

    const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    });

    const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    });

    export default function PlansLayout({ children }: { children: ReactNode }) {
    const router = useRouter();

    const handlePlanClick = (plan: string) => {
        router.push(`/payment?plan=${plan}`);
    };

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {/* Header Section */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
            <div className="container mx-auto px-4 py-6">
                <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">FP</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Fitness Pro</h1>
                </div>
                <p className="text-blue-200 text-lg">Choose Your Perfect Plan</p>
                </div>
            </div>
            </header>

            <main className="min-h-screen py-16 bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto text-center mb-16 px-4">
                <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
                Transform Your <span className="text-blue-600">Fitness Journey</span>
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
                Whether you're just starting or pushing your limits, we have a plan tailored for your fitness journey. 
                Join thousands who've already transformed their lives.
                </p>
            </section>

            {/* Plans Section */}
            <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {/* Free Plan */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏃‍♂️</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2"> Beginner </h3>
                    <p className="text-gray-500 mb-4">Perfect for beginners starting their fitness journey</p>
                </div>
                
                <ul className="flex-1 space-y-3 text-gray-700 mb-8">
                    <li className="flex items-center">
                    <span className="text-green-500 mr-3">✔️</span>
                    <span>Basic Workouts</span>
                    </li>
                    <li className="flex items-center">
                    <span className="text-green-500 mr-3">✔️</span>
                    <span>Nutrition Tips</span>
                    </li>
                    <li className="flex items-center">
                    <span className="text-red-400 mr-3">❌</span>
                    <span className="text-gray-400">Personalized Plans</span>
                    </li>
                    <li className="flex items-center">
                    <span className="text-red-400 mr-3">❌</span>
                    <span className="text-gray-400">Progress Tracking</span>
                    </li>
                </ul>
                
                <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">₹0</span>
                    <span className="text-gray-500 text-lg">/month</span>
                </div>
                
                <button 
                    onClick={() => handlePlanClick("beginner")}
                    className="text-center bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                    Get Started
                </button>v
                </div>

                {/* Standard Plan - Featured */}
                <div className="bg-white rounded-2xl shadow-2xl border-4 border-blue-600 p-8 flex flex-col transform hover:scale-105 transition-all duration-300 relative">
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    MOST POPULAR
                    </span>
                </div>
                
                <div className="text-center mb-6 mt-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💪</span>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">Intermediate</h3>
                    <p className="text-gray-500 mb-4">Perfect for regular fitness enthusiasts</p>
                </div>
                
                <ul className="flex-1 space-y-3 text-gray-700 mb-8">
                    <li className="flex items-center">
                    <span className="text-green-500 mr-3">✔️</span>
                    <span>Full Workout Access</span>
                    </li>
                    <li className="flex items-center">
                    <span className="text-green-500 mr-3">✔️</span>
                    <span>Weekly Nutrition Plans</span>
                    </li>
                    <li className="flex items-center">
                    <span className="text-green-500 mr-3">✔️</span>
                    <span>Basic Progress Tracker</span>
                    </li>
                    <li className="flex items-center">
                    <span className="text-red-400 mr-3">❌</span>
                    <span className="text-gray-400">1-on-1 Coaching</span>
                    </li>
                </ul>
                
                <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-blue-600">₹499</span>
                    <span className="text-gray-500 text-lg">/month</span>
                </div>
                
                <button 
                    onClick={() => handlePlanClick("intermediate")}
                    className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Subscribe Now
                </button>
                </div>

                {/* Premium Plan */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">🏆</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced </h3>
                    <p className="text-gray-500 mb-4">For dedicated individuals wanting the best</p>
                </div>
                
                <ul className="flex-1 space-y-3 text-gray-700 mb-8">
                    <li className="flex items-center">
                    <span className="text-green-500 mr-3">✔️</span>
                    <span>Everything in Standard</span>
                    </li>
                    <li className="flex items-center">
                    <span className="text-green-500 mr-3">✔️</span>
                    <span>Personalized Plans</span>
                    </li>
                    <li className="flex items-center">
                    <span className="text-green-500 mr-3">✔️</span>
                    <span>Progress Reports & Tracker</span>
                    </li>
                    <li className="flex items-center">
                    <span className="text-green-500 mr-3">✔️</span>
                    <span>1-on-1 Coach Support</span>
                    </li>
                </ul>
                
                <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">₹999</span>
                    <span className="text-gray-500 text-lg">/month</span>
                </div>
                
                <button 
                    onClick={() => handlePlanClick("advanced")}
                    className="text-center bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                    Go Premium
                </button>
                </div>
            </section>

            {/* Trust Section */}
            <section className="max-w-4xl mx-auto text-center mt-20 px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Join 10,000+ Happy Members
                </h3>
                <p className="text-gray-600 mb-6">
                    Experience the difference with our proven fitness programs and expert guidance.
                </p>
                <div className="flex justify-center items-center space-x-8">
                    <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">98%</div>
                    <div className="text-gray-500 text-sm">Success Rate</div>
                    </div>
                    <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">24/7</div>
                    <div className="text-gray-500 text-sm">Support</div>
                    </div>
                    <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">30</div>
                    <div className="text-gray-500 text-sm">Day Guarantee</div>
                    </div>
                </div>
                </div>
            </section>
            </main>

        
        </body>
        </html>
    );
    }