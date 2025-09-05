import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const ContactExpertModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        carType: '',
        priceRange: '',
        contact: '',
        vehiclePower: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const carTypes = [
        'Sedan',
        'SUV', 
        'Hatchback',
        'Coupe',
        'Convertible',
        'Truck',
        'Van',
        'Luxury Car',
        'Sports Car',
        'Other'
    ];

    const priceRanges = [
        'Under ₹5Lakh',
        '₹5Lakh - ₹10Lakh',
        '₹10Lakh - ₹15Lakh',
        '₹15Lakh - ₹20Lakh',
        'Above ₹20Lakh',
        'Above 50Lakh',
        'Above 1Crore',
        'Custom Quote'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.contact) {
            toast.error('Please fill in your name and contact information', {
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

        setIsSubmitting(true);

        try {
            // Simulate API call - replace with actual backend integration
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            toast.success('Your request has been sent! Our expert will contact you within 24 hours.', {
                duration: 5000,
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

            // Reset form and close modal
            setFormData({
                name: '',
                carType: '',
                priceRange: '',
                contact: '',
                vehiclePower: ''
            });
            
            setTimeout(() => {
                onClose();
            }, 1000);

        } catch (error) {
            toast.error('Failed to send request. Please try again.', {
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
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-800/95 backdrop-blur-md border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-2xl font-semibold text-white">Contact Our Expert</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6">
                    <p className="text-gray-400 mb-6">
                        Get personalized product recommendations from our car care experts. Fill out the details below and we'll help you find the perfect solution.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 transition-all duration-300"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        {/* Car Type and Vehicle Power */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="carType" className="block text-sm font-medium text-gray-300 mb-2">
                                    Type of Car
                                </label>
                                <select
                                    id="carType"
                                    name="carType"
                                    value={formData.carType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 transition-all duration-300"
                                >
                                    <option value="" className="bg-gray-800">Select your car type</option>
                                    {carTypes.map((type, index) => (
                                        <option key={index} value={type} className="bg-gray-800">
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="vehiclePower" className="block text-sm font-medium text-gray-300 mb-2">
                                    Vehicle Power
                                </label>
                                <select
                                    id="vehiclePower"
                                    name="vehiclePower"
                                    value={formData.vehiclePower}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 transition-all duration-300"
                                >
                                    <option value="" className="bg-gray-800">EV or Normal</option>
                                    <option value="Electric (EV)" className="bg-gray-800">Electric (EV)</option>
                                    <option value="Hybrid" className="bg-gray-800">Hybrid</option>
                                    <option value="Petrol" className="bg-gray-800">Petrol</option>
                                    <option value="Diesel" className="bg-gray-800">Diesel</option>
                                    <option value="CNG" className="bg-gray-800">CNG</option>
                                </select>
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-300 mb-2">
                                Budget Range
                            </label>
                            <select
                                id="priceRange"
                                name="priceRange"
                                value={formData.priceRange}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 transition-all duration-300"
                            >
                                <option value="" className="bg-gray-800">Select your budget range</option>
                                {priceRanges.map((range, index) => (
                                    <option key={index} value={range} className="bg-gray-800">
                                        {range}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Contact Field */}
                        <div>
                            <label htmlFor="contact" className="block text-sm font-medium text-gray-300 mb-2">
                                Contact Information *
                            </label>
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                value={formData.contact}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 transition-all duration-300"
                                placeholder="Phone number or email address"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Sending Request...</span>
                                    </div>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Contact Expert
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Contact Info */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-3">
                                Need immediate help? Contact us directly:
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-300">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    (555) 123-4567
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    expert@detailgreek.com
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactExpertModal;
