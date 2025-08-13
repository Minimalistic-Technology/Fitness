// "use client";

// import React, { useState } from 'react';
// import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';

// export default function LoginPage() {
//     const [showPassword, setShowPassword] = useState(false);
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         rememberMe: false
//     });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const handleSubmit = () => {
//         console.log('Login attempt:', formData);
//         // Handle login logic here
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10">
//             <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//             }} />
//         </div>

//         <div className="relative w-full max-w-md">
//             {/* Header */}
//             <div className="bg-white rounded-t-2xl shadow-xl p-8 text-center">
//             {/* Logo */}
//             <div className="flex justify-center mb-6">
//                 <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
//                 <span className="text-white font-bold text-2xl">FP</span>
//                 </div>
//             </div>
            
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//             <p className="text-gray-600 mb-8">Sign in to your Fitness Pro account</p>
//             </div>

//             {/* Login Form */}
//             <div className="bg-white rounded-b-2xl shadow-xl p-8">
//             <div className="space-y-6">
//                 {/* Email Field */}
//                 <div className="space-y-2">
//                 <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
//                     Email Address
//                 </label>
//                 <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
//                     placeholder="Enter your email"
//                     required
//                     />
//                 </div>
//                 </div>

//                 {/* Password Field */}
//                 <div className="space-y-2">
//                 <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
//                     Password
//                 </label>
//                 <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
//                     placeholder="Enter your password"
//                     required
//                     />
//                     <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                     >
//                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                     </button>
//                 </div>
//                 </div>

//                 {/* Remember Me & Forgot Password */}
//                 <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                     <input
//                     type="checkbox"
//                     id="rememberMe"
//                     name="rememberMe"
//                     checked={formData.rememberMe}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
//                     />
//                     <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
//                     Remember me
//                     </label>
//                 </div>
//                 <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
//                     Forgot password?
//                 </a>
//                 </div>

//                 {/* Login Button */}
//                 <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                 >
//                 Sign In
//                 </button>
//             </div>

//             {/* Sign Up Link */}
//             <div className="mt-8 text-center">
//                 <p className="text-sm text-gray-600">
//                 Don't have an account?{' '}
//                 <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
//                     Sign up for free
//                 </a>
//                 </p>
//             </div>
//             </div>

//             {/* Back to Home */}
//             <div className="mt-6 text-center">
//             <a href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back to Home
//             </a>
//             </div>
//         </div>
//         </div>
//     );
// }
"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
  const router = useRouter();
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
    }));
};


    const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
            email: formData.email,
            password: formData.password,
        }, {
            withCredentials: true, // required for setting cookies like refreshToken
        });

        const { accessToken, user } = res.data;

        console.log("Login successful:", user);
        alert("Login successful");
        router.push("/");
        // Optional: save token in localStorage/sessionStorage
        localStorage.setItem("accessToken", accessToken);

        // Optional: navigate to dashboard
        // router.push("/dashboard");

    } catch (err: any) {
        if (err.response) {
            alert(err.response.data?.error || "Login failed");
        } else {
            console.error("Login error:", err.message);
            alert("Something went wrong. Please try again.");
        }
    }
};

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
        </div>

        <div className="relative w-full max-w-md">
            {/* Header */}
            <div className="bg-white rounded-t-2xl shadow-xl p-8 text-center border-t-4 border-blue-600">
            {/* Logo */}
            <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">FP</span>
                </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600 mb-8">Sign in to your Fitness Pro account</p>
            </div>

            {/* Login Form */}
            <div className="bg-white rounded-b-2xl shadow-xl p-8">
            <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                    Email Address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                    required
                    />
                </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                    Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your password"
                    required
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                    Remember me
                    </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                    Forgot password?
                </a>
                </div>

                {/* Login Button */}
                <button
                type="button"
                onClick={handleButtonClick}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                Sign In
                </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                    Sign up for free
                </a>
                </p>
            </div>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
            <a href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
            </a>
            </div>
        </div>
        </div>
    );
}

