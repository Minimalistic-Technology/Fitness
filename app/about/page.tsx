    import Link from 'next/link';
import React from 'react';

    const AboutPage = () => {
    const stats = [
        { number: '50K+', label: 'Active Members', icon: '👥' },
        { number: '1000+', label: 'Workouts Created', icon: '💪' },
        { number: '95%', label: 'Success Rate', icon: '🎯' },
        { number: '24/7', label: 'Support Available', icon: '🔧' }
    ];

    const teamMembers = [
        {
        name: 'Sarah Johnson',
        role: 'Head Trainer',
        specialty: 'Strength Training & HIIT',
        experience: '8+ Years',
        image: '👩‍💼'
        },
        {
        name: 'Mike Chen',
        role: 'Nutrition Expert',
        specialty: 'Sports Nutrition & Meal Planning',
        experience: '10+ Years',
        image: '👨‍⚕️'
        },
        {
        name: 'Emma Davis',
        role: 'Wellness Coach',
        specialty: 'Mental Health & Motivation',
        experience: '6+ Years',
        image: '👩‍🏫'
        },
        {
        name: 'Alex Rodriguez',
        role: 'Fitness Specialist',
        specialty: 'Cardio & Endurance Training',
        experience: '7+ Years',
        image: '👨‍💻'
        }
    ];

    const values = [
        {
        title: 'Excellence',
        description: 'We strive for the highest quality in everything we do, from workout plans to customer service.',
        icon: '⭐'
        },
        {
        title: 'Community',
        description: 'Building a supportive community where everyone feels welcome and motivated to succeed.',
        icon: '🤝'
        },
        {
        title: 'Innovation',
        description: 'Constantly evolving our methods and technology to provide the best fitness experience.',
        icon: '🚀'
        },
        {
        title: 'Results',
        description: 'Focused on delivering real, measurable results that transform lives and build confidence.',
        icon: '📈'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
            <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">About Fitness Pro</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                We are dedicated to helping you achieve your fitness goals through personalized plans, 
                expert guidance, and a supportive community that believes in your potential.
            </p>
            </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:bg-blue-50 group">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                At Fitness Pro, we believe that fitness is not just about physical transformation—it's about 
                building confidence, creating healthy habits, and empowering individuals to live their best lives. 
                Our comprehensive approach combines cutting-edge workout programs, personalized nutrition guidance, 
                and unwavering support to help you achieve sustainable results.
                </p>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Why Choose Fitness Pro?</h3>
                <p className="text-gray-600 leading-relaxed">
                    We're not just another fitness app. We're your personal fitness companion, equipped with 
                    science-backed methodologies, experienced professionals, and a community that celebrates 
                    every milestone in your journey. From beginners taking their first steps to athletes 
                    pushing their limits, we're here to guide, motivate, and celebrate with you.
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:bg-blue-50 group">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-blue-600 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-gray-50">
            <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Expert Team</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our team consists of experienced fitness trainers, nutritionists, and wellness experts 
                who are passionate about your health and well-being.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="text-center">
                    <div className="text-6xl mb-4">{member.image}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                    <div className="text-blue-600 font-semibold mb-2">{member.role}</div>
                    <div className="text-sm text-gray-600 mb-3">{member.specialty}</div>
                    <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {member.experience}
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied members who have transformed their lives with Fitness Pro. 
                Your journey to a healthier, stronger you starts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={"/workout"} className="bg-white yellow text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Started Today
                </Link>
                <Link href={"/plans"} className="border-2 border-white yellow text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-200">
                View Our Programs
                </Link>
            </div>
            </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-12 bg-black text-white">
            <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                <div className="text-2xl mb-2">📧</div>
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-gray-400">support@fitnesspro.com</p>
                </div>
                <div>
                <div className="text-2xl mb-2">📞</div>
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
                <div>
                <div className="text-2xl mb-2">⏰</div>
                <h3 className="font-semibold text-lg mb-2">Available</h3>
                <p className="text-gray-400">24/7 Support</p>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
    };

    export default AboutPage;