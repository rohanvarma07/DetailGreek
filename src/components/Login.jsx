import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Login = ({ onBack, onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login process
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (formData.email && formData.password) {
                toast.success('Welcome back!', {
                    duration: 3000,
                    position: 'top-right',
                    style: {
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                    },
                    iconTheme: {
                        primary: '#60a5fa',
                        secondary: 'white',
                    },
                });
                
                if (onLogin) {
                    onLogin(formData.email);
                }
                
                if (onBack) {
                    onBack();
                }
            } else {
                toast.error('Please fill in all fields', {
                    duration: 2000,
                    position: 'top-right',
                    style: {
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                    },
                });
            }
        } catch (error) {
            toast.error('Login failed. Please try again.', {
                duration: 2000,
                position: 'top-right',
                style: {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
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
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-violet-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25 mx-auto mb-4">
                                <span className="text-white font-bold text-2xl">DG</span>
                            </div>
                            <h1 className="text-2xl font-light text-white mb-2 tracking-wide">Welcome Back</h1>
                            <p className="text-gray-400 text-sm">Sign in to your Detail Greek account</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            {/* Remember Me and Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center text-gray-300">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span className="ml-2">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        toast('Password reset feature coming soon!', {
                                            duration: 2000,
                                            position: 'top-right',
                                            style: {
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                backdropFilter: 'blur(10px)',
                                                color: 'white',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                borderRadius: '12px',
                                            },
                                            icon: '🔄',
                                        });
                                    }}
                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-600 hover:from-indigo-700 hover:via-violet-700 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center">
                            <div className="flex-1 border-t border-white/10"></div>
                            <span className="px-4 text-gray-400 text-sm">or</span>
                            <div className="flex-1 border-t border-white/10"></div>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center">
                            <p className="text-gray-400 text-sm">
                                Don't have an account?{' '}
                                <button 
                                    onClick={() => {
                                        toast('Coming soon! Sign-up feature is under development.', {
                                            duration: 2500,
                                            position: 'top-right',
                                            style: {
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                backdropFilter: 'blur(10px)',
                                                color: 'white',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                borderRadius: '12px',
                                            },
                                            icon: '🚧',
                                        });
                                    }}
                                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                                >
                                    Sign up for free
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-gray-500 text-xs">
                            By signing in, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
