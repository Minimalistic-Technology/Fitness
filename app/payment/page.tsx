"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
        const searchParams = useSearchParams();
        const plan = searchParams.get("plan") || "intermediate";
        const [selectedPlan, setSelectedPlan] = useState(plan);
        const [paymentMethod, setPaymentMethod] = useState("card");
        const [formData, setFormData] = useState({
            email: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            cardholderName: "",
            upiId: ""
        });

        const plans = {
            beginner: { name: "Beginner", price: 0, duration: "month" },
            intermediate: { name: "Intermediate", price: 499, duration: "month" },
            advanced: { name: "Advanced", price: 999, duration: "month" }
        };

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            // Handle payment processing here
            alert("Payment processing would happen here!");
        };

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">FP</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Fitness Pro</h1>
                    </div>
                    <p className="text-blue-200 text-lg">Complete Your Subscription</p>
                </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Payment Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Payment Details</h2>
                    
                    {/* Plan Selection */}
                    <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Select Your Plan
                    </label>
                    <div className="space-y-3">
                        {Object.entries(plans).map(([key, plan]) => (
                        <label key={key} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                            type="radio"
                            name="plan"
                            value={key}
                            checked={selectedPlan === key}
                            onChange={(e) => setSelectedPlan(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                            />
                            <div className="ml-4 flex-1">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">{plan.name}</span>
                                <span className="font-bold text-blue-600">
                                ₹{plan.price}{plan.price > 0 && `/${plan.duration}`}
                                </span>
                            </div>
                            </div>
                        </label>
                        ))}
                    </div>
                    </div>

                    <div>
                    {/* Email */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                        </label>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        />
                    </div>

                    {/* Payment Method Selection */}
                    {plans[selectedPlan].price > 0 && (
                        <>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-4">
                            Payment Method
                            </label>
                            
                            {/* UPI Payment Options */}
                            <div className="border rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="upi"
                                    checked={paymentMethod === "upi"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 font-medium text-gray-900">UPI ID</span>
                                </div>
                                {paymentMethod === "upi" && (
                                <span className="text-green-500 text-xl">✓</span>
                                )}
                            </div>
                            
                            <div className="text-sm text-gray-600 mb-4">
                                PhonePe, GPay, PayTM, BHIM & more
                            </div>
                            
                            {/* UPI App Icons */}
                            <div className="flex space-x-4 mb-4">
                                <button
                                type="button"
                                onClick={() => setPaymentMethod("upi")}
                                className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mb-1">
                                    <span className="text-white text-xs font-bold">P</span>
                                </div>
                                <span className="text-xs text-gray-700">PhonePe</span>
                                </button>
                                
                                <button
                                type="button"
                                onClick={() => setPaymentMethod("upi")}
                                className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-1">
                                    <span className="text-white text-xs font-bold">G</span>
                                </div>
                                <span className="text-xs text-gray-700">Google Pay</span>
                                </button>
                                
                                <button
                                type="button"
                                onClick={() => setPaymentMethod("upi")}
                                className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mb-1">
                                    <span className="text-white text-xs font-bold">P</span>
                                </div>
                                <span className="text-xs text-gray-700">PayTM</span>
                                </button>
                                
                                <button
                                type="button"
                                onClick={() => setPaymentMethod("upi")}
                                className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mb-1">
                                    <span className="text-white text-xs">•••</span>
                                </div>
                                <span className="text-xs text-gray-700">Others</span>
                                </button>
                            </div>
                            </div>
                            
                            {/* Credit/Debit Card Option */}
                            <div className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === "card"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="text-blue-600 focus:ring-blue-500"
                                />
                                <div className="ml-2">
                                    <div className="font-medium text-gray-900">Debit/Credit Card</div>
                                    <div className="text-sm text-gray-600">Visa, MasterCard, Rupay, etc.</div>
                                </div>
                                </div>
                                {paymentMethod === "card" && (
                                <span className="text-green-500 text-xl">✓</span>
                                )}
                            </div>
                            </div>
                        </div>

                        {/* Card Payment Fields */}
                        {paymentMethod === "card" && (
                            <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cardholder Name
                                </label>
                                <input
                                type="text"
                                name="cardholderName"
                                value={formData.cardholderName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Number
                                </label>
                                <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    placeholder="MM/YY"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                </div>
                                <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    placeholder="123"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                </div>
                            </div>
                            </div>
                        )}

                        {/* UPI Payment Field */}
                        {paymentMethod === "upi" && (
                            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                UPI ID
                                </label>
                                <button
                                type="button"
                                className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full"
                                >
                                VERIFY UPI ID
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                type="text"
                                name="upiId"
                                value={formData.upiId}
                                onChange={handleInputChange}
                                placeholder="UPI ID"
                                className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                />
                                <div className="absolute right-3 top-3 flex items-center">
                                <span className="text-gray-400 mr-1">@</span>
                                <select className="text-sm text-gray-600 bg-transparent border-none focus:outline-none">
                                    <option value="ybl">ybl</option>
                                    <option value="paytm">paytm</option>
                                    <option value="okaxis">okaxis</option>
                                    <option value="oksbi">oksbi</option>
                                </select>
                                </div>
                            </div>
                            </div>
                        )}
                        </>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        {plans[selectedPlan].price === 0 ? "Start Free Plan" : `Pay ₹${plans[selectedPlan].price}`}
                    </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow-xl p-8 h-fit">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
                    
                    <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <div>
                        <h4 className="font-semibold text-gray-900">{plans[selectedPlan].name} Plan</h4>
                        <p className="text-gray-500 text-sm">Monthly subscription</p>
                        </div>
                        <span className="font-bold text-gray-900">
                        ₹{plans[selectedPlan].price}
                        </span>
                    </div>
                    
                    {plans[selectedPlan].price > 0 && (
                        <>
                        <div className="border-t border-gray-300 pt-4">
                            <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">Total</span>
                            <span className="text-2xl font-bold text-blue-600">
                                ₹{plans[selectedPlan].price}
                            </span>
                            </div>
                        </div>
                        </>
                    )}
                    </div>

                    {/* Plan Features */}
                    <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                        {selectedPlan === "beginner" && (
                        <>
                            <li className="flex items-center">
                            <span className="text-green-500 mr-2">✔️</span>
                            Basic Workouts
                            </li>
                            <li className="flex items-center">
                            <span className="text-green-500 mr-2">✔️</span>
                            Nutrition Tips
                            </li>
                        </>
                        )}
                        {selectedPlan === "intermediate" && (
                        <>
                            <li className="flex items-center">
                            <span className="text-green-500 mr-2">✔️</span>
                            Full Workout Access
                            </li>
                            <li className="flex items-center">
                            <span className="text-green-500 mr-2">✔️</span>
                            Weekly Nutrition Plans
                            </li>
                            <li className="flex items-center">
                            <span className="text-green-500 mr-2">✔️</span>
                            Basic Progress Tracker
                            </li>
                        </>
                        )}
                        {selectedPlan === "advanced" && (
                        <>
                            <li className="flex items-center">
                            <span className="text-green-500 mr-2">✔️</span>
                            Everything in Intermediate
                            </li>
                            <li className="flex items-center">
                            <span className="text-green-500 mr-2">✔️</span>
                            Personalized Plans
                            </li>
                            <li className="flex items-center">
                            <span className="text-green-500 mr-2">✔️</span>
                            Progress Reports & Tracker
                            </li>
                            <li className="flex items-center">
                            <span className="text-green-500 mr-2">✔️</span>
                            1-on-1 Coach Support
                            </li>
                        </>
                        )}
                    </ul>
                    </div>

                    {/* Security Badge */}
                    <div className="mt-6 text-center">
                    <div className="flex items-center justify-center space-x-2 text-gray-500">
                        <span className="text-lg">🔒</span>
                        <span className="text-sm">Secure payment with 256-bit SSL encryption</span>
                    </div>
                    </div>
                </div>
                </div>


            </main>
            </div>
        );
        }