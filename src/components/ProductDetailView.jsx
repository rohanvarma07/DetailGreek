import React, { useState, useEffect } from 'react';

const ProductDetailView = ({ product, onBack, onAddToCart }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [quantity, setQuantity] = useState(1);

    // Don't scroll to top when component mounts - let user stay at current position
    useEffect(() => {
        // Remove auto-scroll to maintain user's current scroll position
        // User can manually scroll if needed
    }, [product]);

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
                    {/* Professional Header with Back Button */}
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <button
                            onClick={onBack}
                            className="flex items-center text-blue-300 hover:text-blue-200 transition-all duration-200 group bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-500/30 hover:from-blue-600/30 hover:to-indigo-600/30 hover:border-blue-400/50"
                        >
                            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium">Back</span>
                        </button>
                        
                        {/* Professional status indicator */}
                        <div className="flex items-center bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-sm border border-emerald-500/30 rounded-lg px-3 py-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                            <span className="text-emerald-200 text-xs font-medium">Product Details</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Professional Product Image */}
                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-sm border border-gray-700/40 hover:border-blue-500/30 rounded-lg overflow-hidden h-64 sm:h-80 lg:h-96 relative transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                                {/* Display actual product image if available */}
                                {product.image && product.image !== '/uploads/' && !product.image.startsWith('http') ? (
                                    <img 
                                        src={`http://localhost:9090${product.image}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : product.image && product.image.startsWith('http') ? (
                                    <img 
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                
                                {/* Emoji fallback */}
                                <div 
                                    className={`absolute inset-0 flex items-center justify-center bg-gray-700/20 ${
                                        product.image && product.image !== '/uploads/' ? 'hidden' : 'flex'
                                    }`}
                                >
                                    <div className="text-6xl sm:text-8xl opacity-60">
                                        {product.imageEmoji || product.image || '📦'}
                                    </div>
                                </div>
                                
                                {/* Backend Image Indicator */}
                                {product.image && product.image !== '/uploads/' && (
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500/60 to-indigo-500/60 rounded-full p-2">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Professional Product Details */}
                        <div className="space-y-6">
                            {/* Product Header */}
                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-3 sm:mb-4 tracking-wide">
                                    {product.name}
                                </h1>
                                {product.rating && (
                                    <div className="flex items-center gap-4 mb-4 sm:mb-6">
                                        <div className="flex items-center bg-gradient-to-r from-amber-600/20 to-orange-600/20 backdrop-blur-sm rounded-lg px-3 py-1 border border-amber-500/30">
                                            <div className="flex items-center mr-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg 
                                                        key={i} 
                                                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-600'}`} 
                                                        fill="currentColor" 
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-amber-200 font-medium text-sm">{product.rating.toFixed(1)}</span>
                                            <span className="text-amber-300/70 ml-2 text-sm">({product.reviews})</span>
                                        </div>
                                    </div>
                                )}
                                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                                    {product.detailedDescription}
                                </p>
                            </div>

                            {/* Professional Price and Add to Cart */}
                            <div className="bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-sm border border-gray-700/40 rounded-lg p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                    <span className="text-2xl sm:text-3xl font-medium text-white">
                                        {product.price}
                                    </span>
                                    <div className="flex items-center space-x-3">
                                        <label className="text-gray-300 font-medium text-sm">Qty:</label>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-8 h-8 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 hover:from-blue-600/60 hover:to-indigo-600/60 rounded flex items-center justify-center transition-colors border border-blue-500/50 hover:border-blue-400/70"
                                            >
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                </svg>
                                            </button>
                                            <span className="text-white font-medium w-8 text-center text-sm">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-8 h-8 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 hover:from-blue-600/60 hover:to-indigo-600/60 rounded flex items-center justify-center transition-colors border border-blue-500/50 hover:border-blue-400/70"
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
                                    className="w-full bg-gradient-to-r from-blue-600/40 to-indigo-600/40 hover:from-blue-600/60 hover:to-indigo-600/60 text-white font-medium py-3 sm:py-4 px-6 rounded transition-all duration-200 border border-blue-500/50 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/20"
                                >
                                    Add to Cart - {product.price}
                                </button>
                            </div>

                            {/* Professional Key Features */}
                            <div className="bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-sm border border-gray-700/40 rounded-lg p-4 sm:p-6">
                                <h3 className="text-lg sm:text-xl font-medium text-white mb-4">Features</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {product.features.map((feature, index) => (
                                        <div key={index} className="flex items-center text-gray-300 text-sm">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 flex-shrink-0"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Detailed Information Tabs */}
                    <div className="mt-12 lg:mt-16">
                        <div className="bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-sm border border-gray-700/40 rounded-lg overflow-hidden">
                            {/* Professional Tab Navigation */}
                            <div className="flex flex-wrap border-b border-gray-700/40">
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
                                                ? 'text-white bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border-b-2 border-blue-400'
                                                : 'text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-indigo-600/10'
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
                                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                                    {benefit}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'usage' && (
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-light text-white mb-6">Usage</h3>
                                        <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 border border-gray-600/40 rounded-lg p-4 sm:p-6">
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
