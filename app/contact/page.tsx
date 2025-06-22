    'use client';

    import { useState } from 'react';

    export default function ContactPage() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Simulate form submission
        try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        
        setSubmitStatus('success');
        setFormData({ email: '', phone: '', message: '' });
        } catch (error) {
        setSubmitStatus('error');
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
            <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                Ready to start your fitness journey? Have questions about our programs? 
                We'd love to hear from you and help you achieve your fitness goals.
                </p>
            </div>
            </div>
        </div>

        {/* Contact Form Section */}
        <div className="py-16">
            <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Contact Information */}
                <div className="space-y-8">
                    <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        Our team is here to support you every step of the way. Reach out to us 
                        for personalized fitness advice, program recommendations, or any questions 
                        you might have.
                    </p>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        </div>
                        <div>
                        <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                        <p className="text-gray-600">sunny@fitnesspro</p>
                        <p className="text-gray-600">fitness@pro.com</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        </div>
                        <div>
                        <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                        <p className="text-gray-600">91+ 8828036062</p>
                        <p className="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        </div>
                        <div>
                        <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                        <p className="text-gray-600">Aaarry colony Main pump streets</p>
                        <p className="text-gray-600">Goregaon East CIty , HC 12345</p>
                        </div>
                    </div>
                    </div>

                    {/* Response Time */}
                    <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Response</h3>
                    <p className="text-blue-700">
                        We typically respond to all inquiries within 24 hours during business days. 
                        For urgent matters, please call us directly.
                    </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                        </label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="your.email@example.com"
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                        </label>
                        <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="+1 (555) 123-4567"
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                        </label>
                        <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                        placeholder="Tell us about your fitness goals, questions, or how we can help you..."
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </span>
                        ) : (
                        'Send Message'
                        )}
                    </button>
                    </form>

                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex">
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">
                            Message sent successfully! We'll get back to you within 24 hours.
                            </p>
                        </div>
                        </div>
                    </div>
                    )}

                    {submitStatus === 'error' && (
                    <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex">
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">
                            There was an error sending your message. Please try again or contact us directly.
                            </p>
                        </div>
                        </div>
                    </div>
                    )}
                </div>
                </div>
            </div>
            </div>
        </div>

        FAQ Section
        {/* <div className="bg-white py-16">
            <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600 mb-12">
                Quick answers to common questions about our fitness programs and services.
                </p>
                
                <div className="text-left space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">How quickly will I see results?</h3>
                    <p className="text-gray-600">
                    Results vary by individual, but most clients see improvements in strength and energy within 2-4 weeks of consistent training.
                    </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer personalized workout plans?</h3>
                    <p className="text-gray-600">
                    Yes! We create customized workout and nutrition plans based on your goals, fitness level, and preferences.
                    </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">What equipment do I need to get started?</h3>
                    <p className="text-gray-600">
                    Many of our programs can be done with minimal equipment. We'll recommend specific equipment based on your chosen program.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div> */}
        </div>
    );
    }