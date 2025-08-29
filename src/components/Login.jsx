import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiService } from '../services/apiService';

const Login = ({ onBack, onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [emailCheckStatus, setEmailCheckStatus] = useState(null); // null, 'checking', 'available', 'taken'
    const [emailCheckTimer, setEmailCheckTimer] = useState(null);

    // Scroll to top when Login component mounts
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        // Load remember me preference
        const savedEmail = localStorage.getItem('dg-remember-email');
        if (savedEmail) {
            setFormData(prev => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, []);

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const validateForm = (data, isSignUpForm = false) => {
        const errors = {};

        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!validateEmail(data.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!data.password) {
            errors.password = 'Password is required';
        } else if (!validatePassword(data.password)) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (isSignUpForm) {
            if (!data.firstName.trim()) {
                errors.firstName = 'First name is required';
            }
            if (!data.lastName.trim()) {
                errors.lastName = 'Last name is required';
            }
            if (data.password !== data.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
        }

        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (isSignUp) {
            setSignUpData(prev => ({
                ...prev,
                [name]: value
            }));
            
            // Check email availability for signup
            if (name === 'email' && value && validateEmail(value)) {
                // Clear previous timer
                if (emailCheckTimer) {
                    clearTimeout(emailCheckTimer);
                }
                
                // Set new timer to check email after user stops typing
                const timer = setTimeout(async () => {
                    setEmailCheckStatus('checking');
                    try {
                        const response = await apiService.auth.checkEmail(value);
                        setEmailCheckStatus(response.emailTaken ? 'taken' : 'available');
                    } catch (error) {
                        console.error('Email check failed:', error);
                        setEmailCheckStatus(null);
                    }
                }, 1000); // Wait 1 second after user stops typing
                
                setEmailCheckTimer(timer);
            } else if (name === 'email') {
                setEmailCheckStatus(null);
            }
            
            // Clear error for this field
            if (formErrors[name]) {
                setFormErrors(prev => ({
                    ...prev,
                    [name]: ''
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
            // Clear error for this field
            if (formErrors[name]) {
                setFormErrors(prev => ({
                    ...prev,
                    [name]: ''
                }));
            }
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(signUpData, true);
        
        // Add email availability check to validation
        if (emailCheckStatus === 'taken') {
            errors.email = 'This email is already taken';
        }
        
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            toast.error('Please fix the errors below', {
                duration: 3000,
                position: 'top-right',
                style: {
                    background: 'rgba(239, 68, 68, 0.15)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                },
            });
            return;
        }

        setIsLoading(true);
        setFormErrors({});

        try {
            // Use the actual signup API
            const response = await apiService.auth.signup({
                email: signUpData.email,
                password: signUpData.password,
                firstName: signUpData.firstName,
                lastName: signUpData.lastName
            });
            
            if (response.success) {
                toast.success('Account created successfully! Please sign in.', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: 'rgba(34, 197, 94, 0.15)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '12px',
                    },
                    iconTheme: {
                        primary: '#22c55e',
                        secondary: 'white',
                    },
                });

                // Switch to login form with pre-filled email
                setIsSignUp(false);
                setFormData({ email: signUpData.email, password: '' });
                setSignUpData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                setEmailCheckStatus(null);
            } else {
                throw new Error(response.message || 'Sign up failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error(error.message || 'Sign up failed. Please try again.', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: 'rgba(239, 68, 68, 0.15)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            toast.error('Please fix the errors below', {
                duration: 3000,
                position: 'top-right',
                style: {
                    background: 'rgba(239, 68, 68, 0.15)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                },
            });
            return;
        }

        setIsLoading(true);
        setFormErrors({});

        try {
            // Use the actual onLogin function passed from App.jsx
            if (onLogin) {
                await onLogin(formData.email, formData.password);
                
                // Save email if remember me is checked
                if (rememberMe) {
                    localStorage.setItem('dg-remember-email', formData.email);
                } else {
                    localStorage.removeItem('dg-remember-email');
                }

                toast.success('Welcome back to Detail Greek! 🚗✨', {
                    duration: 4000,
                    position: 'top-right',
                    style: {
                        background: 'rgba(34, 197, 94, 0.15)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '12px',
                    },
                    iconTheme: {
                        primary: '#22c55e',
                        secondary: 'white',
                    },
                });
            } else {
                // Fallback for demo purposes
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                if (formData.email && formData.password) {
                    toast.success('Welcome back to Detail Greek! 🚗✨', {
                        duration: 4000,
                        position: 'top-right',
                        style: {
                            background: 'rgba(34, 197, 94, 0.15)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            borderRadius: '12px',
                        },
                        iconTheme: {
                            primary: '#22c55e',
                            secondary: 'white',
                        },
                    });
                    
                    if (onBack) {
                        onBack();
                    }
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.message || 'Login failed. Please check your credentials.', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: 'rgba(239, 68, 68, 0.15)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
            {/* Floating Car Emojis Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-16 left-8 text-5xl opacity-10 blur-sm animate-pulse" style={{animationDelay: '0s', animationDuration: '5s'}}>🚗</div>
                <div className="absolute top-32 right-16 text-4xl opacity-15 blur-sm animate-bounce" style={{animationDelay: '1s', animationDuration: '6s'}}>🚙</div>
                <div className="absolute bottom-32 left-20 text-6xl opacity-10 blur-sm animate-pulse" style={{animationDelay: '2s', animationDuration: '7s'}}>🏎️</div>
                <div className="absolute bottom-16 right-12 text-3xl opacity-20 blur-sm animate-bounce" style={{animationDelay: '3s', animationDuration: '4s'}}>🚘</div>
                <div className="hidden sm:block absolute top-1/2 left-16 text-4xl opacity-15 blur-sm animate-pulse" style={{animationDelay: '4s', animationDuration: '5s'}}>🚖</div>
                <div className="hidden md:block absolute top-1/3 right-1/4 text-5xl opacity-10 blur-sm animate-bounce" style={{animationDelay: '5s', animationDuration: '6s'}}>🚐</div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 py-8">
                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header with Back Button */}
                    <div className="mb-8">
                        <button
                            onClick={onBack}
                            className="flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 group bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 hover:bg-white/10 mb-6"
                        >
                            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium">Back</span>
                        </button>
                    </div>

                    {/* Login Form */}
                    <div className="bg-gradient-to-br from-white/5 via-indigo-500/5 to-teal-500/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                        {/* Logo and Title */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 via-violet-600 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/25 mx-auto mb-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                <span className="text-white font-bold text-3xl relative z-10">DG</span>
                            </div>
                            <h1 className="text-3xl font-light text-white mb-3 tracking-wide">
                                {isSignUp ? 'Create Account' : 'Welcome Back'}
                            </h1>
                            <p className="text-gray-400 text-base">
                                {isSignUp 
                                    ? 'Join Detail Greek and start your car care journey' 
                                    : 'Sign in to your Detail Greek account'
                                }
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={isSignUp ? handleSignUpSubmit : handleSubmit} className="space-y-6">
                            {/* Sign Up Fields */}
                            {isSignUp && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* First Name */}
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={signUpData.firstName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                                                formErrors.firstName 
                                                    ? 'border-red-400/50 focus:border-red-400/70 focus:bg-red-50/5' 
                                                    : 'border-white/10 focus:border-blue-400/50 focus:bg-white/10'
                                            }`}
                                            placeholder="First name"
                                            required
                                        />
                                        {formErrors.firstName && (
                                            <p className="mt-1 text-red-400 text-xs flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {formErrors.firstName}
                                            </p>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={signUpData.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                                                formErrors.lastName 
                                                    ? 'border-red-400/50 focus:border-red-400/70 focus:bg-red-50/5' 
                                                    : 'border-white/10 focus:border-blue-400/50 focus:bg-white/10'
                                            }`}
                                            placeholder="Last name"
                                            required
                                        />
                                        {formErrors.lastName && (
                                            <p className="mt-1 text-red-400 text-xs flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {formErrors.lastName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address *
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={isSignUp ? signUpData.email : formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                                            formErrors.email 
                                                ? 'border-red-400/50 focus:border-red-400/70 focus:bg-red-50/5' 
                                                : emailCheckStatus === 'taken'
                                                ? 'border-red-400/50 focus:border-red-400/70 focus:bg-red-50/5'
                                                : emailCheckStatus === 'available'
                                                ? 'border-green-400/50 focus:border-green-400/70 focus:bg-green-50/5'
                                                : 'border-white/10 focus:border-blue-400/50 focus:bg-white/10'
                                        }`}
                                        placeholder="Enter your email"
                                        required
                                    />
                                    {/* Email Status Indicator */}
                                    {isSignUp && signUpData.email && (
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            {emailCheckStatus === 'checking' && (
                                                <svg className="animate-spin w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            )}
                                            {emailCheckStatus === 'available' && (
                                                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            {emailCheckStatus === 'taken' && (
                                                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {formErrors.email && (
                                    <p className="mt-1 text-red-400 text-xs flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {formErrors.email}
                                    </p>
                                )}
                                {isSignUp && emailCheckStatus === 'taken' && (
                                    <p className="mt-1 text-red-400 text-xs flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        This email is already taken
                                    </p>
                                )}
                                {isSignUp && emailCheckStatus === 'available' && (
                                    <p className="mt-1 text-green-400 text-xs flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Email is available
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={isSignUp ? signUpData.password : formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                                            formErrors.password 
                                                ? 'border-red-400/50 focus:border-red-400/70 focus:bg-red-50/5' 
                                                : 'border-white/10 focus:border-blue-400/50 focus:bg-white/10'
                                        }`}
                                        placeholder={isSignUp ? "Create a password (min. 6 characters)" : "Enter your password"}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {formErrors.password && (
                                    <p className="mt-1 text-red-400 text-xs flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {formErrors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password for Sign Up */}
                            {isSignUp && (
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                        Confirm Password *
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={signUpData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                                            formErrors.confirmPassword 
                                                ? 'border-red-400/50 focus:border-red-400/70 focus:bg-red-50/5' 
                                                : 'border-white/10 focus:border-blue-400/50 focus:bg-white/10'
                                        }`}
                                        placeholder="Confirm your password"
                                        required
                                    />
                                    {formErrors.confirmPassword && (
                                        <p className="mt-1 text-red-400 text-xs flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {formErrors.confirmPassword}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Remember Me and Forgot Password - Only for Login */}
                            {!isSignUp && (
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center text-gray-300 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                                        />
                                        <span className="ml-2">Remember me</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            toast('Password reset link sent! Check your email.', {
                                                duration: 3000,
                                                position: 'top-right',
                                                style: {
                                                    background: 'rgba(59, 130, 246, 0.15)',
                                                    backdropFilter: 'blur(10px)',
                                                    color: 'white',
                                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                                    borderRadius: '12px',
                                                },
                                                icon: '�',
                                            });
                                        }}
                                        className="text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-600 hover:from-indigo-700 hover:via-violet-700 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {isSignUp ? 'Creating Account...' : 'Signing In...'}
                                    </div>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        {isSignUp ? 'Create Account' : 'Sign In'}
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center">
                            <div className="flex-1 border-t border-white/10"></div>
                            <span className="px-4 text-gray-400 text-sm">or</span>
                            <div className="flex-1 border-t border-white/10"></div>
                        </div>

                        {/* Toggle between Sign In/Sign Up */}
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-4">
                                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            </p>
                            <button 
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setFormErrors({});
                                    setFormData({ email: '', password: '' });
                                    setSignUpData({
                                        firstName: '',
                                        lastName: '',
                                        email: '',
                                        password: '',
                                        confirmPassword: ''
                                    });
                                    setEmailCheckStatus(null);
                                    if (emailCheckTimer) {
                                        clearTimeout(emailCheckTimer);
                                        setEmailCheckTimer(null);
                                    }
                                }}
                                className="w-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-blue-400 hover:text-blue-300 font-medium py-3 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm"
                            >
                                {isSignUp ? 'Sign In Instead' : 'Create Free Account'}
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-gray-500 text-xs leading-relaxed max-w-md mx-auto">
                            By {isSignUp ? 'creating an account' : 'signing in'}, you agree to our{' '}
                            <button className="text-blue-400 hover:text-blue-300 transition-colors underline">
                                Terms of Service
                            </button>
                            {' '}and{' '}
                            <button className="text-blue-400 hover:text-blue-300 transition-colors underline">
                                Privacy Policy
                            </button>
                        </p>
                        <div className="mt-4 flex items-center justify-center space-x-2 text-gray-500 text-xs">
                            <span>🔒</span>
                            <span>Your data is secure and encrypted</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
