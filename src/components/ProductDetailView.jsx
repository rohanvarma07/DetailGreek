import React, { useState } from 'react';

const ProductDetailView = ({ product, onBack, onAddToCart }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            onAddToCart(product);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
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
            <div className="relative z-10 py-4 sm:py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Minimal Header with Back Button */}
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <button
                            onClick={onBack}
                            className="flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 group bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 hover:bg-white/10"
                        >
                            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium">Back</span>
                        </button>
                        
                        {/* Product emoji indicator */}
                        <div className="text-2xl opacity-60">
                            {product.id <= 3 ? '🧴' : product.id <= 6 ? '🧽' : product.id <= 10 ? '✨' : '🪑'}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Minimal Product Image */}
                        <div className="space-y-4">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                                <div className="text-6xl sm:text-8xl opacity-60">
                                    {product.id <= 3 ? '🧴' : product.id <= 6 ? '🧽' : product.id <= 10 ? '✨' : '🪑'}
                                </div>
                            </div>
                        </div>

                        {/* Minimal Product Details */}
                        <div className="space-y-6">
                            {/* Product Header */}
                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-3 sm:mb-4 tracking-wide">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                                    <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full px-3 py-1 border border-white/10">
                                        <span className="text-yellow-400 mr-2">⭐</span>
                                        <span className="text-white font-medium text-sm">{product.rating}</span>
                                        <span className="text-gray-400 ml-2 text-sm">({product.reviews})</span>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                    {product.detailedDescription}
                                </p>
                            </div>

                            {/* Minimal Price and Add to Cart */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                    <span className="text-2xl sm:text-3xl font-semibold text-blue-400">
                                        {product.price}
                                    </span>
                                    <div className="flex items-center space-x-3">
                                        <label className="text-white font-medium text-sm">Qty:</label>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors border border-white/10"
                                            >
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                </svg>
                                            </button>
                                            <span className="text-white font-semibold w-8 text-center text-sm">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors border border-white/10"
                                            >
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/10"
                                >
                                    Add to Cart - {product.price}
                                </button>
                            </div>

                            {/* Minimal Key Features */}
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6">
                                <h3 className="text-lg sm:text-xl font-medium text-white mb-4">Features</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {product.features.map((feature, index) => (
                                        <div key={index} className="flex items-center text-gray-300 text-sm">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Minimal Detailed Information Tabs */}
                    <div className="mt-12 lg:mt-16">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
                            {/* Minimal Tab Navigation */}
                            <div className="flex flex-wrap border-b border-white/10">
                                {[
                                    { id: 'overview', label: 'Overview' },
                                    { id: 'specifications', label: 'Specs' },
                                    { id: 'benefits', label: 'Benefits' },
                                    { id: 'usage', label: 'Usage' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base transition-colors ${
                                            activeTab === tab.id
                                                ? 'text-blue-400 bg-blue-500/10 border-b-2 border-blue-400'
                                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Minimal Tab Content */}
                            <div className="p-4 sm:p-6 lg:p-8">
                                {activeTab === 'overview' && (
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-light text-white mb-4">Overview</h3>
                                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                            {product.detailedDescription}
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'specifications' && (
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Specifications</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                            {Object.entries(product.specifications).map(([key, value]) => (
                                                <div key={key} className="flex justify-between py-2 border-b border-white/5">
                                                    <span className="text-gray-300 font-medium text-sm">{key}</span>
                                                    <span className="text-white font-medium text-sm">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'benefits' && (
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Benefits</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            {product.benefits.map((benefit, index) => (
                                                <div key={index} className="flex items-start text-gray-300 text-sm">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                                    {benefit}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'usage' && (
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Usage</h3>
                                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 sm:p-6">
                                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                                {product.usage}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailView;
