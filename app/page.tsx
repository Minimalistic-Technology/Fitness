"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaUsers, FaDumbbell, FaAward, FaStar, FaPlay, FaArrowRight, FaHeart, FaRunning, FaAppleAlt } from 'react-icons/fa';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Personalized Workouts",
      description: "Custom fitness plans tailored to your goals, fitness level, and schedule",
      icon: <FaRunning className="w-12 h-12 text-blue-600" />,
      color: "blue"
    },
    {
      title: "Nutrition Guidance",
      description: "Expert meal planning and nutrition coaching to fuel your fitness journey",
      icon: <FaAppleAlt className="w-12 h-12 text-green-500" />,
      color: "green"
    },
    {
      title: "Health Tracking",
      description: "Monitor your progress with comprehensive health and fitness analytics",
      icon: <FaHeart className="w-12 h-12 text-red-600" />,
      color: "red"
    }
  ];

  const stats = [
    { icon: FaUsers, number: "2M+", label: "Active Members" },
    { icon: FaDumbbell, number: "50K+", label: "Workouts" },
    { icon: FaAward, number: "98%", label: "Success Rate" },
    { icon: FaStar, number: "4.9", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Clean Fitness Focus */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
            alt="People exercising in modern gym"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-blue-50/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                      Fitness  2025
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Health Journey
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-xl leading-relaxed">
                Join millions who've discovered sustainable fitness. Get personalized workouts, 
                nutrition guidance, and expert coaching to achieve lasting results.
              </p>

              <div className="mb-8 space-y-3">
                {['Personalized workout plans', 'Expert nutrition coaching', 'Progress tracking & analytics', '24/7 community support'].map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group">
                  Start Free Trial
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 font-semibold text-lg rounded-lg transition-all duration-300 flex items-center justify-center group">
                  <FaPlay className="mr-2 group-hover:scale-110 transition-transform" />
                  Watch DemO
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white"></div>
                    ))}
                  </div>
                  <span>2M+ happy members</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <Icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Health Focused */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need for
              <span className="block text-blue-600">Complete Wellness</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines fitness, nutrition, and wellness coaching 
              to help you achieve sustainable, long-term health 
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 bg-gray-50 rounded-2xl text-center hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-${feature.color}-200`}
              >
                <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Online fitness training session"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <button className="w-16 h-16 bg-white hover:bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl shadow-lg transition-all duration-300 hover:scale-110">
                  <FaPlay className="ml-1" />
                </button>
              </div>
            </div>

            {/* Right Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Online Personal
                <span className="block text-blue-600">Training</span>
              </h2>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Get expert guidance from certified trainers through live virtual sessions. 
                Receive personalized coaching, real-time feedback, and the motivation 
                you need to reach your fitness goals.
              </p>

              <div className="space-y-4 mb-8">
                {['1-on-1 Personal Training Sessions', 'Live Group Fitness Classes', 'Custom Workout Plans', 'Nutrition Consultations'].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-lg text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Book a Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Friendly and Motivating */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your
            <span className="block">Fitness Journey?</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join over 2 million people who've transformed their lives with Fitness Pro. 
            Start your free trial today and discover what you're capable of achieving.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="px-10 py-4 bg-white hover:bg-gray-100 text-blue-600 font-bold text-xl rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
              Start Your Free Trial
              <FaArrowRight className="ml-3" />
            </button>
            
            <button className="px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-xl rounded-lg transition-all duration-300">
              Learn More
            </button>
          </div>

          <p className="text-sm text-blue-100">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}