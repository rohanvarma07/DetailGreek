import { useState, useEffect, useRef } from 'react';

const LoginPage = ({ onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });
  const emailInputRef = useRef(null);

  // Auto-focus email input when modal opens and prevent background scroll
  useEffect(() => {
    // Prevent background scroll
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    // Get scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    // Auto-focus email input
    const timer = setTimeout(() => {
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
    }, 300);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) return { score: 0, text: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strength = {
      0: { text: '', color: '' },
      1: { text: 'Very Weak', color: 'text-red-400' },
      2: { text: 'Weak', color: 'text-orange-400' },
      3: { text: 'Fair', color: 'text-yellow-400' },
      4: { text: 'Good', color: 'text-blue-400' },
      5: { text: 'Strong', color: 'text-green-400' }
    };

    return { score, ...strength[score] };
  };

  // Real-time form validation
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        } else {
          delete newErrors.password;
        }
        if (isSignUp) {
          setPasswordStrength(checkPasswordStrength(value));
        }
        break;
      case 'confirmPassword':
        if (isSignUp && value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case 'firstName':
        if (isSignUp && !value) {
          newErrors.firstName = 'First name is required';
        } else {
          delete newErrors.firstName;
        }
        break;
      case 'lastName':
        if (isSignUp && !value) {
          newErrors.lastName = 'Last name is required';
        } else {
          delete newErrors.lastName;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Real-time validation
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with more realistic timing
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) {
        onLogin(formData);
      }
      onClose();
    }, 1000);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: formData.email, // Keep email when switching modes
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: ''
    });
    setErrors({});
    setPasswordStrength({ score: 0, text: '', color: '' });
  };

  // Handle social login
  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) {
        onLogin({
          email: `user@${provider}.com`,
          firstName: 'Social',
          lastName: 'User',
          provider
        });
      }
      onClose();
    }, 800);
  };

  // Handle keyboard shortcuts and prevent scroll propagation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Prevent wheel events from propagating to background
  const handleWheel = (e) => {
    e.stopPropagation();
  };

  // Prevent touch events from propagating on mobile
  const handleTouchMove = (e) => {
    e.stopPropagation();
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={-1}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        onWheel={handleWheel}
        onTouchMove={handleTouchMove}
      />
      
      {/* Login Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="w-full max-w-md bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30"
          onWheel={handleWheel}
          onTouchMove={handleTouchMove}
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Header */}
          <div className="relative p-8 pb-4">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 transform hover:scale-110"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-400">
                {isSignUp 
                  ? 'Join DetailGreek for premium car care' 
                  : 'Sign in to your DetailGreek account'
                }
              </p>
            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="px-8 mb-6">
            <div className="relative bg-black/40 p-1 rounded-full border border-white/10">
              <div 
                className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-transform duration-300 ease-out ${
                  isSignUp ? 'translate-x-full' : 'translate-x-0'
                }`}
              />
              <div className="relative flex">
                <button
                  onClick={() => !isSignUp || toggleMode()}
                  className={`flex-1 py-3 text-center font-medium rounded-full transition-colors duration-300 ${
                    !isSignUp ? 'text-black' : 'text-white hover:text-yellow-400'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => isSignUp || toggleMode()}
                  className={`flex-1 py-3 text-center font-medium rounded-full transition-colors duration-300 ${
                    isSignUp ? 'text-black' : 'text-white hover:text-yellow-400'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            
            {/* Sign Up Fields */}
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-right duration-300">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:ring-2 transition-all duration-200 ${
                      errors.firstName 
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                        : 'border-white/10 focus:border-yellow-400 focus:ring-yellow-400/20'
                    }`}
                    placeholder="John"
                    required={isSignUp}
                    autoComplete="given-name"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:ring-2 transition-all duration-200 ${
                      errors.lastName 
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                        : 'border-white/10 focus:border-yellow-400 focus:ring-yellow-400/20'
                    }`}
                    placeholder="Doe"
                    required={isSignUp}
                    autoComplete="family-name"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
            )}

            {/* Email */}
            <div className="animate-in fade-in duration-500">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  ref={emailInputRef}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:ring-2 transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                      : 'border-white/10 focus:border-yellow-400 focus:ring-yellow-400/20'
                  }`}
                  placeholder="john@example.com"
                  required
                  autoComplete="email"
                />
                {/* Email validation icon */}
                {formData.email && !errors.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 animate-in slide-in-from-left duration-200">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone (Sign Up Only) */}
            {isSignUp && (
              <div className="animate-in slide-in-from-right duration-400">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200"
                  placeholder="+1 (555) 123-4567"
                  required={isSignUp}
                />
              </div>
            )}

            {/* Password */}
            <div className="animate-in fade-in duration-600">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:ring-2 transition-all duration-200 ${
                    errors.password 
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                      : 'border-white/10 focus:border-yellow-400 focus:ring-yellow-400/20'
                  }`}
                  placeholder="••••••••"
                  required
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.697 6.697m3.181 3.181l4.242 4.242M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 animate-in slide-in-from-left duration-200">
                  {errors.password}
                </p>
              )}
              {/* Password strength indicator for sign up */}
              {isSignUp && formData.password && passwordStrength.text && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Password strength:</span>
                    <span className={passwordStrength.color}>{passwordStrength.text}</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-700 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        passwordStrength.score <= 1 ? 'bg-red-400' :
                        passwordStrength.score <= 2 ? 'bg-orange-400' :
                        passwordStrength.score <= 3 ? 'bg-yellow-400' :
                        passwordStrength.score <= 4 ? 'bg-blue-400' : 'bg-green-400'
                      }`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {isSignUp && (
              <div className="animate-in slide-in-from-right duration-500">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:ring-2 transition-all duration-200 ${
                      errors.confirmPassword 
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                        : 'border-white/10 focus:border-yellow-400 focus:ring-yellow-400/20'
                    }`}
                    placeholder="••••••••"
                    required={isSignUp}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.697 6.697m3.181 3.181l4.242 4.242M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  {/* Password match indicator */}
                  {formData.confirmPassword && !errors.confirmPassword && formData.confirmPassword === formData.password && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1 animate-in slide-in-from-left duration-200">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Remember Me & Forgot Password (Sign In Only) */}
            {!isSignUp && (
              <div className="flex items-center justify-between animate-in fade-in duration-500">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 rounded transition-all duration-200 ${
                    rememberMe 
                      ? 'bg-yellow-400 border-yellow-400' 
                      : 'border-white/30 hover:border-yellow-400'
                  }`}>
                    {rememberMe && (
                      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
              className={`w-full py-4 font-bold text-lg rounded-xl transform transition-all duration-200 shadow-lg mt-8 ${
                isLoading || Object.keys(errors).length > 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 hover:scale-[1.02] hover:shadow-yellow-400/25'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-black rounded-full animate-spin"></div>
                  <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                  {Object.keys(errors).length === 0 && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </div>
              )}
            </button>

            {/* Terms (Sign Up Only) */}
            {isSignUp && (
              <p className="text-xs text-gray-500 text-center mt-4 animate-in fade-in duration-700">
                By creating an account, you agree to our{' '}
                <button className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200">
                  Privacy Policy
                </button>
              </p>
            )}
          </form>

          {/* Social Login */}
          <div className="px-8 pb-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black/90 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-xl text-white hover:border-yellow-400/50 hover:bg-white/5 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              
              <button 
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                disabled={isLoading}
                className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-xl text-white hover:border-yellow-400/50 hover:bg-white/5 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
