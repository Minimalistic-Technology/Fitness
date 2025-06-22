
"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, Scale, TrendingUp, X, History, Utensils, Target, Clock, Apple } from 'lucide-react';

// Define a type for BMI data
interface BMIData {
    weight: number;
    weightKg: number;
    height: number;
    heightM: number;
    date: string;
    unit: string;
    bmi: number;
}

// Diet plan interface
interface DietPlan {
    category: string;
    dailyCalories: string;
    mealPlan: {
        breakfast: string[];
        lunch: string[];
        dinner: string[];
        snacks: string[];
    };
    tips: string[];
    waterIntake: string;
    exerciseRecommendation: string;
}

// This is your main BMI tracker component
export default function BMITracker() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('metric');
    const [bmi, setBmi] = useState<number | null>(null);
    const [bmiHistory, setBmiHistory] = useState<BMIData[]>([]);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showDietPlan, setShowDietPlan] = useState(false);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [activityLevel, setActivityLevel] = useState('moderate');

    // Load BMI history from memory on component mount
    useEffect(() => {
        // Initialize with empty array since localStorage is not available
        setBmiHistory([]);
    }, []);

    const calculateBMI = async () => {
        if (!height || !weight) return;
        
        setIsCalculating(true);
        
        // Add a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));
        
        let heightInMeters, weightInKg;
        
        if (unit === 'metric') {
            heightInMeters = parseFloat(height) / 100;
            weightInKg = parseFloat(weight);
        } else {
            heightInMeters = parseFloat(height) * 0.0254;
            weightInKg = parseFloat(weight) * 0.453592;
        }
        
        const bmiValue = weightInKg / (heightInMeters * heightInMeters);
        setBmi(parseFloat(bmiValue.toFixed(1)));

        // Create new BMI entry
        const newBMIEntry: BMIData = {
            weight: parseFloat(weight),
            weightKg: weightInKg,
            height: parseFloat(height),
            heightM: heightInMeters,
            date: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
            unit: unit,
            bmi: parseFloat(bmiValue.toFixed(1))
        };
        
        const updatedHistory = [newBMIEntry, ...bmiHistory];
        setBmiHistory(updatedHistory);
        
        setIsCalculating(false);
    };

    const getBMICategory = (bmiValue: number) => {
        if (bmiValue < 18.5) return { 
            category: 'Underweight', 
            color: 'text-blue-600', 
            bgColor: 'bg-blue-100',
            description: 'Consider consulting a healthcare provider'
        };
        if (bmiValue < 25) return { 
            category: 'Normal weight', 
            color: 'text-green-600', 
            bgColor: 'bg-green-100',
            description: 'Great! Maintain your healthy lifestyle'
        };
        if (bmiValue < 30) return { 
            category: 'Overweight', 
            color: 'text-yellow-600', 
            bgColor: 'bg-yellow-100',
            description: 'Consider a balanced diet and regular exercise'
        };
        return { 
            category: 'Obese', 
            color: 'text-red-600', 
            bgColor: 'bg-red-100',
            description: 'Consult a healthcare provider for guidance'
        };
    };

    const calculateCalories = (bmiValue: number, weightKg: number) => {
        const ageNum = parseInt(age) || 25;
        let bmr;
        
        // Calculate BMR using Mifflin-St Jeor Equation
        if (gender === 'male') {
            bmr = 10 * weightKg + 6.25 * (parseFloat(height) * (unit === 'metric' ? 1 : 2.54)) - 5 * ageNum + 5;
        } else {
            bmr = 10 * weightKg + 6.25 * (parseFloat(height) * (unit === 'metric' ? 1 : 2.54)) - 5 * ageNum - 161;
        }

        // Activity multipliers
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };

        const maintenanceCalories = Math.round(bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers]);
        
        // Adjust calories based on BMI category
        if (bmiValue < 18.5) {
            return maintenanceCalories + 300; // Surplus for weight gain
        } else if (bmiValue > 25) {
            return maintenanceCalories - 500; // Deficit for weight loss
        } else {
            return maintenanceCalories; // Maintenance
        }
    };

    const getDietPlan = (bmiValue: number): DietPlan => {
        const calories = calculateCalories(bmiValue, parseFloat(weight) * (unit === 'metric' ? 1 : 0.453592));
        
        if (bmiValue < 18.5) {
            return {
                category: 'Weight Gain Plan',
                dailyCalories: `${calories} calories`,
                mealPlan: {
                    breakfast: [
                        'Oatmeal with banana, nuts, and honey',
                        'Greek yogurt with granola and berries',
                        'Avocado toast with eggs',
                        'Protein smoothie with fruits and nut butter'
                    ],
                    lunch: [
                        'Quinoa bowl with grilled chicken and vegetables',
                        'Salmon with sweet potato and broccoli',
                        'Pasta with lean meat sauce and vegetables',
                        'Rice bowl with tofu, beans, and avocado'
                    ],
                    dinner: [
                        'Grilled fish with quinoa and roasted vegetables',
                        'Chicken stir-fry with brown rice',
                        'Lentil curry with whole grain bread',
                        'Beef and vegetable stew with potatoes'
                    ],
                    snacks: [
                        'Trail mix with nuts and dried fruits',
                        'Protein bars or smoothies',
                        'Cheese and whole grain crackers',
                        'Hummus with vegetables and pita'
                    ]
                },
                tips: [
                    'Eat frequently - 5-6 small meals per day',
                    'Focus on nutrient-dense, calorie-rich foods',
                    'Include healthy fats like nuts, avocados, and olive oil',
                    'Don\'t skip meals, especially breakfast',
                    'Consider protein supplements if needed'
                ],
                waterIntake: '8-10 glasses per day',
                exerciseRecommendation: 'Strength training 3-4 times per week, limit cardio'
            };
        } else if (bmiValue < 25) {
            return {
                category: 'Maintenance Plan',
                dailyCalories: `${calories} calories`,
                mealPlan: {
                    breakfast: [
                        'Oatmeal with berries and nuts',
                        'Greek yogurt with fruits',
                        'Whole grain toast with avocado',
                        'Smoothie bowl with protein powder'
                    ],
                    lunch: [
                        'Grilled chicken salad with mixed vegetables',
                        'Quinoa bowl with roasted vegetables',
                        'Fish with brown rice and steamed broccoli',
                        'Lentil soup with whole grain bread'
                    ],
                    dinner: [
                        'Lean protein with vegetables and sweet potato',
                        'Grilled fish with quinoa and asparagus',
                        'Chicken breast with roasted vegetables',
                        'Tofu stir-fry with brown rice'
                    ],
                    snacks: [
                        'Apple with almond butter',
                        'Greek yogurt with berries',
                        'Handful of nuts',
                        'Vegetable sticks with hummus'
                    ]
                },
                tips: [
                    'Maintain balanced portions of all food groups',
                    'Stay consistent with meal timing',
                    'Include variety in your diet',
                    'Listen to your hunger and fullness cues',
                    'Continue healthy habits that work for you'
                ],
                waterIntake: '8 glasses per day',
                exerciseRecommendation: 'Mix of cardio and strength training, 4-5 times per week'
            };
        } else if (bmiValue < 30) {
            return {
                category: 'Weight Loss Plan',
                dailyCalories: `${calories} calories`,
                mealPlan: {
                    breakfast: [
                        'Greek yogurt with berries (no granola)',
                        'Vegetable omelet with whole grain toast',
                        'Oatmeal with cinnamon and apple slices',
                        'Protein smoothie with spinach and banana'
                    ],
                    lunch: [
                        'Large salad with grilled chicken and vinaigrette',
                        'Vegetable soup with lean protein',
                        'Grilled fish with steamed vegetables',
                        'Quinoa salad with chickpeas and vegetables'
                    ],
                    dinner: [
                        'Grilled lean protein with roasted vegetables',
                        'Cauliflower rice stir-fry with tofu',
                        'Zucchini noodles with turkey meatballs',
                        'Baked fish with asparagus and Brussels sprouts'
                    ],
                    snacks: [
                        'Carrot sticks with hummus',
                        'Apple slices',
                        'Handful of almonds',
                        'Cucumber with Greek yogurt dip'
                    ]
                },
                tips: [
                    'Focus on portion control',
                    'Fill half your plate with vegetables',
                    'Choose lean proteins and whole grains',
                    'Limit processed foods and added sugars',
                    'Eat slowly and mindfully'
                ],
                waterIntake: '10-12 glasses per day',
                exerciseRecommendation: 'Cardio 5 times per week + strength training 2-3 times'
            };
        } else {
            return {
                category: 'Structured Weight Loss Plan',
                dailyCalories: `${calories} calories`,
                mealPlan: {
                    breakfast: [
                        'Egg white omelet with vegetables',
                        'Greek yogurt with berries (plain, no sugar)',
                        'Oatmeal with cinnamon (no added sugars)',
                        'Protein smoothie with spinach and cucumber'
                    ],
                    lunch: [
                        'Large green salad with grilled chicken breast',
                        'Vegetable broth-based soup',
                        'Grilled fish with steamed broccoli',
                        'Lettuce wraps with lean turkey'
                    ],
                    dinner: [
                        'Grilled lean protein with steamed vegetables',
                        'Cauliflower rice with grilled chicken',
                        'Baked fish with roasted non-starchy vegetables',
                        'Turkey meatballs with zucchini noodles'
                    ],
                    snacks: [
                        'Celery sticks with almond butter (1 tbsp)',
                        'Cucumber slices',
                        '10-15 almonds',
                        'Cherry tomatoes with herbs'
                    ]
                },
                tips: [
                    'Work with a healthcare provider or nutritionist',
                    'Practice strict portion control',
                    'Eliminate processed foods and sugary drinks',
                    'Focus on high-fiber, low-calorie foods',
                    'Consider meal prep for better control'
                ],
                waterIntake: '12+ glasses per day',
                exerciseRecommendation: 'Daily cardio + strength training 3-4 times per week'
            };
        }
    };

    const resetBMI = () => {
        setHeight('');
        setWeight('');
        setBmi(null);
        setShowDietPlan(false);
    };

    const clearHistory = () => {
        setBmiHistory([]);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && height && weight) {
            calculateBMI();
        }
    };

    const isFormValid = height && weight && parseFloat(height) > 0 && parseFloat(weight) > 0;

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <Scale className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">BMI Tracker & Diet Planner</h1>
                            <p className="text-blue-100 text-sm">Monitor your BMI and get personalized diet recommendations</p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Unit Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                        <button
                            onClick={() => setUnit('metric')}
                            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                                unit === 'metric'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Metric (cm/kg)
                        </button>
                        <button
                            onClick={() => setUnit('imperial')}
                            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                                unit === 'imperial'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Imperial (in/lbs)
                        </button>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* BMI Calculator */}
                        <div className="xl:col-span-1">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">BMI Calculator</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Height ({unit === 'metric' ? 'cm' : 'inches'})
                                    </label>
                                    <input
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder={unit === 'metric' ? '170' : '68'}
                                        min="1"
                                        step="0.1"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                                    </label>
                                    <input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder={unit === 'metric' ? '70' : '154'}
                                        min="1"
                                        step="0.1"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                
                                {/* Additional fields for diet planning */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                        <input
                                            type="number"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            placeholder="25"
                                            min="1"
                                            max="120"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
                                    <select
                                        value={activityLevel}
                                        onChange={(e) => setActivityLevel(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    >
                                        <option value="sedentary">Sedentary (desk job)</option>
                                        <option value="light">Light exercise (1-3 days/week)</option>
                                        <option value="moderate">Moderate (3-5 days/week)</option>
                                        <option value="active">Active (6-7 days/week)</option>
                                        <option value="very_active">Very active (2x/day)</option>
                                    </select>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={calculateBMI}
                                        disabled={!isFormValid || isCalculating}
                                        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        {isCalculating ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Calculating...
                                            </>
                                        ) : (
                                            <>
                                                <Calculator className="w-4 h-4" />
                                                Calculate BMI
                                            </>
                                        )}
                                    </button>
                                    {bmi && (
                                        <button
                                            onClick={resetBMI}
                                            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* BMI Result */}
                            {bmi && (
                                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-800 mb-2">
                                            BMI: {bmi}
                                        </div>
                                        <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getBMICategory(bmi).bgColor} ${getBMICategory(bmi).color} mb-2`}>
                                            {getBMICategory(bmi).category}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">
                                            {getBMICategory(bmi).description}
                                        </p>
                                        <button
                                            onClick={() => setShowDietPlan(!showDietPlan)}
                                            className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-all duration-200 flex items-center gap-2 mx-auto"
                                        >
                                            <Utensils className="w-4 h-4" />
                                            {showDietPlan ? 'Hide' : 'View'} Diet Plan
                                        </button>
                                    </div>
                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                        <div className="text-xs text-gray-600 text-center">
                                            <strong>BMI Categories:</strong> Underweight (&lt;18.5) • Normal (18.5-24.9) • Overweight (25-29.9) • Obese (≥30)
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Diet Plan */}
                        {bmi && showDietPlan && (
                            <div className="xl:col-span-2">
                                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                                    {(() => {
                                        const plan = getDietPlan(bmi);
                                        return (
                                            <>
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                                        <Utensils className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-green-800">{plan.category}</h3>
                                                        <p className="text-green-600 text-sm flex items-center gap-2">
                                                            <Target className="w-4 h-4" />
                                                            Target: {plan.dailyCalories}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                    {/* Meal Plan */}
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                            <Apple className="w-4 h-4" />
                                                            Daily Meal Plan
                                                        </h4>
                                                        <div className="space-y-4">
                                                            {Object.entries(plan.mealPlan).map(([meal, options]) => (
                                                                <div key={meal} className="bg-white p-3 rounded-lg border border-green-200">
                                                                    <h5 className="font-medium text-gray-800 capitalize mb-2">{meal}</h5>
                                                                    <ul className="text-sm text-gray-600 space-y-1">
                                                                        {options.map((option, index) => (
                                                                            <li key={index} className="flex items-start gap-2">
                                                                                <span className="text-green-500 mt-1">•</span>
                                                                                {option}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Tips and Recommendations */}
                                                    <div className="space-y-4">
                                                        <div className="bg-white p-4 rounded-lg border border-green-200">
                                                            <h4 className="font-semibold text-gray-800 mb-3">Nutrition Tips</h4>
                                                            <ul className="text-sm text-gray-600 space-y-2">
                                                                {plan.tips.map((tip, index) => (
                                                                    <li key={index} className="flex items-start gap-2">
                                                                        <span className="text-green-500 mt-1">•</span>
                                                                        {tip}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="bg-white p-4 rounded-lg border border-green-200">
                                                            <h4 className="font-semibold text-gray-800 mb-3">Recommendations</h4>
                                                            <div className="space-y-3 text-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                                    <span className="font-medium">Water:</span>
                                                                    <span className="text-gray-600">{plan.waterIntake}</span>
                                                                </div>
                                                                <div className="flex items-start gap-2">
                                                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                                                                    <div>
                                                                        <span className="font-medium">Exercise:</span>
                                                                        <p className="text-gray-600">{plan.exerciseRecommendation}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                    <p className="text-xs text-yellow-800">
                                                        <strong>Disclaimer:</strong> This is a general diet plan based on your BMI. Please consult with a healthcare provider or registered dietitian for personalized advice, especially if you have health conditions or dietary restrictions.
                                                    </p>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        )}

                        {/* BMI History */}
                        <div className={bmi && showDietPlan ? 'xl:col-span-3' : 'xl:col-span-2'}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <History className="w-5 h-5" />
                                    BMI History ({bmiHistory.length})
                                </h2>
                                {bmiHistory.length > 0 && (
                                    <button
                                        onClick={clearHistory}
                                        className="text-sm text-red-600 hover:text-red-700 transition-colors"
                                    >
                                        Clear History
                                    </button>
                                )}
                            </div>
                            
                            {bmiHistory.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <Scale className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                    <p>No BMI calculations yet</p>
                                    <p className="text-sm">Start by calculating your BMI</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                                    {bmiHistory.map((record, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-lg font-bold text-gray-800">
                                                            BMI: {record.bmi}
                                                        </span>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getBMICategory(record.bmi).bgColor} ${getBMICategory(record.bmi).color}`}>
                                                            {getBMICategory(record.bmi).category}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        Height: {record.height} {record.unit === 'metric' ? 'cm' : 'in'} • 
                                                        Weight: {record.weight} {record.unit === 'metric' ? 'kg' : 'lbs'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    {record.date}
                                                </span>
                                                {index === 0 && (
                                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                                                        Latest
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}