// "use client";

// import React, { useState } from 'react';
// import { Eye, EyeOff, Lock, Mail, ArrowLeft, User, Phone } from 'lucide-react';
// import axios from "axios"; 

// // Define an interface for the form data
// interface SignupFormData {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     password: string;
//     confirmPassword: string;
//     agreeToTerms: boolean;
//     subscribeNewsletter: boolean;
// }

// // Define an interface for form errors
// interface FormErrors {
//     firstName?: string;
//     lastName?: string;
//     email?: string;
//     phone?: string;
//     password?: string;
//     confirmPassword?: string;
//     agreeToTerms?: string;
//     subscribeNewsletter?: string;
// }

// // Initialize the form data with the correct type
// const initialFormData: SignupFormData = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false,
//     subscribeNewsletter: false
// };

// const SignupPage = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [formData, setFormData] = useState<SignupFormData>(initialFormData);
//     const [errors, setErrors] = useState<FormErrors>({});

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
        
//         // Clear error when user starts typing
//         if (errors[name as keyof FormErrors]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: ''
//             }));
//         }
//     };

//     const validateForm = () => {
//         const newErrors: FormErrors = {};
        
//         if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
//         if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
//         if (!formData.email.trim()) newErrors.email = 'Email is required';
//         if (!formData.password) newErrors.password = 'Password is required';
//         if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
//         if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//         if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//  const handleSubmit = async () => {
//   if (validateForm()) {
//     const fullName = `${formData.firstName} ${formData.lastName}`;

//     try {
//       const res = await axios.post("http://localhost:5000/api/v1/auth/signup", {
//         username: fullName,
//         email: formData.email,
//         password: formData.password,
//         phone: formData.phone,
//         institute: "Fitness Pro"
//       });

//       alert("Signup successful!");
//       // Optional: router.push("/login");

//     } catch (err: any) {
//       if (err.response) {
//         console.error("Signup error:", err.response.data?.error);
//         alert(err.response.data?.error || "Signup failed");
//       } else {
//         console.error("Network error:", err.message);
//         alert("Something went wrong. Please try again.");
//       }
//     }
//   }
// };
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-10">
//                 <div className="absolute inset-0" style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//                 }} />
//             </div>

//             <div className="relative w-full max-w-md">
//                 {/* Header */}
//                 <div className="bg-white rounded-t-2xl shadow-xl p-8 text-center">
//                     {/* Logo */}
//                     <div className="flex justify-center mb-6">
//                         <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
//                             <span className="text-white font-bold text-2xl">FP</span>
//                         </div>
//                     </div>
                    
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Fitness Pro</h1>
//                     <p className="text-gray-600 mb-8">Create your account and start your fitness journey</p>
//                 </div>

//                 {/* Sign Up Form */}
//                 <div className="bg-white rounded-b-2xl shadow-xl p-8">
//                     <div className="space-y-6">
//                         {/* Name Fields */}
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <label htmlFor="firstName" className="text-sm font-medium text-gray-700 block">
//                                     First Name
//                                 </label>
//                                 <div className="relative">
//                                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                         <User className="h-5 w-5 text-gray-400" />
//                                     </div>
//                                     <input
//                                         type="text"
//                                         id="firstName"
//                                         name="firstName"
//                                         value={formData.firstName}
//                                         onChange={handleInputChange}
//                                         className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
//                                             errors.firstName ? 'border-red-300' : 'border-gray-300'
//                                         }`}
//                                         placeholder="John"
//                                         required
//                                     />
//                                 </div>
//                                 {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
//                             </div>
                            
//                             <div className="space-y-2">
//                                 <label htmlFor="lastName" className="text-sm font-medium text-gray-700 block">
//                                     Last Name
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type="text"
//                                         id="lastName"
//                                         name="lastName"
//                                         value={formData.lastName}
//                                         onChange={handleInputChange}
//                                         className={`w-full pl-4 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
//                                             errors.lastName ? 'border-red-300' : 'border-gray-300'
//                                         }`}
//                                         placeholder="Doe"
//                                         required
//                                     />
//                                 </div>
//                                 {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
//                             </div>
//                         </div>

//                         {/* Email Field */}
//                         <div className="space-y-2">
//                             <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
//                                 Email Address
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Mail className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
//                                         errors.email ? 'border-red-300' : 'border-gray-300'
//                                     }`}
//                                     placeholder="john.doe@example.com"
//                                     required
//                                 />
//                             </div>
//                             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//                         </div>

//                         {/* Phone Field */}
//                         <div className="space-y-2">
//                             <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">
//                                 Phone Number <span className="text-gray-400">(Optional)</span>
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Phone className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     type="tel"
//                                     id="phone"
//                                     name="phone"
//                                     value={formData.phone}
//                                     onChange={handleInputChange}
//                                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
//                                     placeholder="+1 (555) 123-4567"
//                                 />
//                             </div>
//                         </div>

//                         {/* Password Field */}
//                         <div className="space-y-2">
//                             <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
//                                 Password
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Lock className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     id="password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleInputChange}
//                                     className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
//                                         errors.password ? 'border-red-300' : 'border-gray-300'
//                                     }`}
//                                     placeholder="Create a strong password"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                                 >
//                                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                                 </button>
//                             </div>
//                             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//                         </div>

//                         {/* Confirm Password Field */}
//                         <div className="space-y-2">
//                             <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block">
//                                 Confirm Password
//                             </label>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <Lock className="h-5 w-5 text-gray-400" />
//                                 </div>
//                                 <input
//                                     type={showConfirmPassword ? "text" : "password"}
//                                     id="confirmPassword"
//                                     name="confirmPassword"
//                                     value={formData.confirmPassword}
//                                     onChange={handleInputChange}
//                                     className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
//                                         errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
//                                     }`}
//                                     placeholder="Confirm your password"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                                 >
//                                     {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                                 </button>
//                             </div>
//                             {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
//                         </div>

//                         {/* Terms and Newsletter */}
//                         <div className="space-y-4">
//                             <div className="flex items-start">
//                                 <input
//                                     type="checkbox"
//                                     id="agreeToTerms"
//                                     name="agreeToTerms"
//                                     checked={formData.agreeToTerms}
//                                     onChange={handleInputChange}
//                                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200 mt-0.5"
//                                 />
//                                 <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
//                                     I agree to the{' '}
//                                     <a href="/terms" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
//                                         Terms of Service
//                                     </a>{' '}
//                                     and{' '}
//                                     <a href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
//                                         Privacy Policy
//                                     </a>
//                                 </label>
//                             </div>
//                             {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}
                            
//                             <div className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     id="subscribeNewsletter"
//                                     name="subscribeNewsletter"
//                                     checked={formData.subscribeNewsletter}
//                                     onChange={handleInputChange}
//                                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
//                                 />
//                                 <label htmlFor="subscribeNewsletter" className="ml-2 text-sm text-gray-700">
//                                     Subscribe to our newsletter for fitness tips and updates
//                                 </label>
//                             </div>
//                         </div>

//                         {/* Sign Up Button */}
//                         <button
//                             onClick={handleSubmit}
//                             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                         >
//                             Create Account
//                         </button>
//                     </div>

//                     {/* Sign In Link */}
//                     <div className="mt-8 text-center">
//                         <p className="text-sm text-gray-600">
//                             Already have an account?{' '}
//                             <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
//                                 Sign in here
//                             </a>
//                         </p>
//                     </div>
//                 </div>

//                 {/* Back to Home */}
//                 <div className="mt-6 text-center">
//                     <a href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">
//                         <ArrowLeft className="w-4 h-4 mr-2" />
//                         Back to Home
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SignupPage;



"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, User, Phone } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/context";

// Define an interface for the form data
interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  description?: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

// Define an interface for form errors
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  description?: string;
  agreeToTerms?: string;
  subscribeNewsletter?: string;
}

// Initialize the form data with the correct type
const initialFormData: SignupFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  description: "",
  agreeToTerms: false,
  subscribeNewsletter: false,
};

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter()
  const {setToken} = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      // const fullName = ${formData.firstName} ${formData.lastName};

      try {
        const res = await axios.post(
          "http://localhost:5000/api/fitness/signup",
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            description: formData.description,
          }
        );
        setToken(res?.data?.token)
        // localStorage.setItem("accessToken", res?.data?.token);
        alert("Signup successful!");
        router.push("/")
        // Optional: router.push("/login");
      } catch (err: any) {
        if (err.response) {
          console.error("Signup error:", err.response.data?.error);
          alert(err.response.data?.error || "Signup failed");
        } else {
          console.error("Network error:", err.message);
          alert("Something went wrong. Please try again.");
        }
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-xl p-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">FP</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join Fitness Pro
          </h1>
          <p className="text-gray-600 mb-8">
            Create your account and start your fitness journey
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-b-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700 block"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                      errors.firstName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="John"
                    required
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700 block"
                >
                  Last Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full pl-4 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                      errors.lastName ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Doe"
                    required
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 block"
              >
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
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 block"
              >
                Phone Number <span className="text-gray-400">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 block"
              >
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
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700 block"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    errors.confirmPassword
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* description */}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 block"
              >
                Description
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="I'm a fitness-savvy guy"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            {/* Terms and Newsletter */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200 mt-0.5"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-2 text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="subscribeNewsletter"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
                />
                <label
                  htmlFor="subscribeNewsletter"
                  className="ml-2 text-sm text-gray-700"
                >
                  Subscribe to our newsletter for fitness tips and updates
                </label>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;