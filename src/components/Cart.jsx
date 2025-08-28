import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductDetailView from './ProductDetailView';

const Cart = ({ onBackToShop }) => {
    const { items, removeFromCart, updateQuantity, clearCart, getCartTotal, addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductDetail, setShowProductDetail] = useState(false);

    // Scroll to top when Cart component mounts
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    // Scroll to top when returning from product detail view
    useEffect(() => {
        if (!showProductDetail) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [showProductDetail]);

    const formatPrice = (price) => {
        const numPrice = parseFloat(price.replace('₹', '').replace(',', ''));
        return `₹${numPrice.toLocaleString('en-IN')}`;
    };

    const handleProductClick = (item) => {
        // Convert cart item to product format for ProductDetailView
        const product = {
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            detailedDescription: item.detailedDescription || item.description || 'Professional quality product for your car care needs.',
            image: item.image,
            imageEmoji: item.imageEmoji,
            features: item.features || ['Professional Grade', 'High Quality', 'Easy to Use', 'Durable'],
            specifications: item.specifications || {
                "Product ID": item.id.toString(),
                "Price": item.price,
                "In Cart": `${item.quantity} item${item.quantity !== 1 ? 's' : ''}`
            },
            benefits: item.benefits || [
                'Premium quality ingredients',
                'Long-lasting results', 
                'Professional grade formula',
                'Safe for all vehicle types'
            ],
            usage: item.usage || 'Follow product instructions for best results. Test on small area first.',
            rating: item.rating || Math.round((4.5 + (Math.random() * 0.4)) * 10) / 10, // Random rating between 4.5-4.9, rounded to 1 decimal
            reviews: item.reviews || Math.floor(Math.random() * 150) + 25,
            quantity: item.quantity
        };
        
        setSelectedProduct(product);
        setShowProductDetail(true);
    };

    const handleBackToCart = () => {
        setShowProductDetail(false);
        setSelectedProduct(null);
    };

    const handleAddToCartFromDetail = (product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            features: product.features,
            image: product.image,
            imageEmoji: product.imageEmoji
        });
    };

    // Show product detail view if a product is selected
    if (showProductDetail && selectedProduct) {
        return (
            <ProductDetailView 
                product={selectedProduct} 
                onBack={handleBackToCart}
                onAddToCart={handleAddToCartFromDetail}
            />
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
                {/* Minimal Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-[0.02]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                    <div className="absolute top-20 left-10 w-24 h-24 bg-white/2 rounded-full blur-xl animate-pulse" style={{animationDelay: '0s', animationDuration: '6s'}}></div>
                    <div className="absolute bottom-40 right-20 w-32 h-32 bg-white/1 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s', animationDuration: '8s'}}></div>
                </div>

                {/* Enhanced Empty State */}
                <div className="relative z-10 flex items-center justify-center min-h-screen px-3 sm:px-4">
                    <div className="text-center max-w-sm sm:max-w-md mx-auto">
                        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/40 rounded-xl p-6 sm:p-8 lg:p-12">
                            <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 opacity-60">🛒</div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-white mb-2 sm:mb-3 tracking-wide">Your Cart is Empty</h2>
                            <p className="text-gray-400 mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed">Start shopping to add some amazing car care products to your cart!</p>
                            <button 
                                onClick={onBackToShop}
                                className="bg-gray-700/40 hover:bg-gray-600/60 border border-gray-600/50 hover:border-gray-500/70 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 text-sm sm:text-base"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
            {/* Enhanced Background with Better Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-indigo-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '0s', animationDuration: '6s'}}></div>
                <div className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-purple-500/8 via-pink-500/4 to-violet-500/8 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s', animationDuration: '8s'}}></div>
                <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-gradient-to-br from-emerald-500/6 via-teal-500/3 to-cyan-500/6 rounded-full blur-xl animate-pulse" style={{animationDelay: '6s', animationDuration: '10s'}}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 pt-12 sm:pt-16 pb-6 sm:pb-8">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
                    {/* Responsive Header Section */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
                        <button
                            onClick={onBackToShop}
                            className="group flex items-center bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-lg px-3 sm:px-5 py-2 sm:py-2.5 hover:from-gray-700/80 hover:to-gray-600/80 hover:border-gray-500/60 transition-all duration-200 shadow-lg"
                        >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-300 group-hover:text-white group-hover:-translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-gray-200 text-xs sm:text-sm font-medium group-hover:text-white transition-colors duration-200">Back to Shop</span>
                        </button>
                        
                        <div className="flex items-center bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-sm border border-blue-600/30 rounded-lg px-2.5 sm:px-4 py-1.5 sm:py-2.5 shadow-lg">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                            <span className="text-blue-200 text-xs sm:text-sm font-medium">{items.length} Item{items.length !== 1 ? 's' : ''}</span>
                        </div>
                    </div>

                    {/* Enhanced Title with Gradient */}
                    <div className="text-center mb-6 sm:mb-10">
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-light bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-3 tracking-tight">Shopping Cart</h1>
                        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-3"></div>
                        <p className="text-gray-400 text-xs sm:text-sm">Click on any product to view details</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {/* Enhanced Cart Items with Better Spacing and Colors */}
                        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                            {items.map((item, index) => (
                                <div 
                                    key={item.id} 
                                    className="group relative bg-gradient-to-r from-gray-800/40 via-gray-800/30 to-gray-700/40 backdrop-blur-sm border border-gray-600/40 rounded-xl p-3 sm:p-6 hover:from-gray-700/50 hover:to-gray-600/50 hover:border-gray-500/60 transition-all duration-300 shadow-xl cursor-pointer"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                        animation: 'slideInUp 0.6s ease-out forwards'
                                    }}
                                    onClick={() => handleProductClick(item)}
                                >
                                    {/* Click indicator */}
                                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-60 transition-opacity duration-200">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>

                                    {/* Mobile Layout - Stack vertically */}
                                    <div className="sm:hidden">
                                        <div className="flex items-start space-x-3 mb-3">
                                            {/* Product Image - Smaller on mobile */}
                                            <div className="w-12 h-12 bg-gradient-to-br from-gray-600/30 to-gray-700/40 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-600/30 shadow-lg">
                                                {item.image && item.image.startsWith('http') ? (
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                
                                                <div 
                                                    className={`w-full h-full flex items-center justify-center ${
                                                        item.image && item.image.startsWith('http') ? 'hidden' : 'flex'
                                                    }`}
                                                >
                                                    <div className="text-xl opacity-70">
                                                        {item.imageEmoji || item.image || (item.id <= 3 ? '🧴' : item.id <= 6 ? '🧽' : item.id <= 10 ? '✨' : '🪑')}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Product Details - Full width on mobile */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base font-semibold text-white mb-1 leading-tight">{item.name}</h3>
                                                <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Price and Controls Row */}
                                        <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-700/40 to-gray-600/40 rounded-lg p-1.5 border border-gray-600/30">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateQuantity(item.id, item.quantity - 1);
                                                    }}
                                                    className="w-6 h-6 bg-gradient-to-r from-red-600/60 to-red-500/60 hover:from-red-600/80 hover:to-red-500/80 rounded flex items-center justify-center transition-all duration-200 border border-red-500/30"
                                                >
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>
                                                <span className="text-white font-semibold w-6 text-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateQuantity(item.id, item.quantity + 1);
                                                    }}
                                                    className="w-6 h-6 bg-gradient-to-r from-emerald-600/60 to-green-500/60 hover:from-emerald-600/80 hover:to-green-500/80 rounded flex items-center justify-center transition-all duration-200 border border-emerald-500/30"
                                                >
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                </button>
                                            </div>
                                            
                                            <div className="text-right">
                                                <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-0.5">{formatPrice(item.price)}</div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromCart(item.id);
                                                    }}
                                                    className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors duration-200 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop Layout - Horizontal */}
                                    <div className="hidden sm:flex items-center space-x-4 lg:space-x-6">
                                        {/* Enhanced Product Image - Larger */}
                                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-600/30 to-gray-700/40 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-600/30 shadow-lg group-hover:scale-105 transition-transform duration-200">
                                            {/* Display actual product image if available */}
                                            {item.image && item.image.startsWith('http') ? (
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            
                                            {/* Enhanced Emoji fallback */}
                                            <div 
                                                className={`w-full h-full flex items-center justify-center ${
                                                    item.image && item.image.startsWith('http') ? 'hidden' : 'flex'
                                                }`}
                                            >
                                                <div className="text-2xl lg:text-3xl opacity-70">
                                                    {item.imageEmoji || item.image || (item.id <= 3 ? '🧴' : item.id <= 6 ? '🧽' : item.id <= 10 ? '✨' : '🪑')}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enhanced Product Details - Larger Text */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg lg:text-xl font-semibold text-white mb-1 lg:mb-2 line-clamp-1">{item.name}</h3>
                                            <p className="text-gray-300 text-sm lg:text-base line-clamp-2 leading-relaxed">{item.description}</p>
                                        </div>

                                        {/* Enhanced Quantity Controls with Gradients */}
                                        <div className="flex items-center space-x-3 lg:space-x-4" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center space-x-2 lg:space-x-3 bg-gradient-to-r from-gray-700/40 to-gray-600/40 rounded-xl p-2 border border-gray-600/30">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateQuantity(item.id, item.quantity - 1);
                                                    }}
                                                    className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-red-600/60 to-red-500/60 hover:from-red-600/80 hover:to-red-500/80 rounded-lg flex items-center justify-center transition-all duration-200 border border-red-500/30 shadow-lg"
                                                >
                                                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>
                                                <span className="text-white font-semibold w-6 lg:w-8 text-center text-base lg:text-lg">{item.quantity}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateQuantity(item.id, item.quantity + 1);
                                                    }}
                                                    className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-emerald-600/60 to-green-500/60 hover:from-emerald-600/80 hover:to-green-500/80 rounded-lg flex items-center justify-center transition-all duration-200 border border-emerald-500/30 shadow-lg"
                                                >
                                                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                </button>
                                            </div>
                                            
                                            <div className="text-right">
                                                <div className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">{formatPrice(item.price)}</div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromCart(item.id);
                                                    }}
                                                    className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Enhanced Order Summary with Gradients */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-700/40 backdrop-blur-sm border border-gray-600/40 rounded-xl p-4 sm:p-6 lg:sticky lg:top-20 shadow-xl">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4 sm:mb-6">Order Summary</h3>
                                
                                {/* Enhanced Item List */}
                                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-start text-xs sm:text-sm py-2 border-b border-gray-700/30 gap-2">
                                            <span className="text-gray-300 font-medium flex-1 leading-tight">
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span className="text-white font-semibold text-right flex-shrink-0">
                                                ₹{(parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Enhanced Total Section */}
                                <div className="border-t border-gradient-to-r from-blue-500/20 to-purple-500/20 pt-4 sm:pt-5 mb-4 sm:mb-6">
                                    <div className="flex justify-between items-center bg-gradient-to-r from-gray-700/30 to-gray-600/30 rounded-lg p-3 sm:p-4 border border-gray-600/30">
                                        <span className="text-lg sm:text-xl font-semibold text-white">Total</span>
                                        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">₹{getCartTotal().toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                {/* Enhanced Action Buttons with Gradients */}
                                <div className="space-y-3 sm:space-y-4">
                                    <button className="w-full bg-gradient-to-r from-blue-600/80 via-cyan-600/80 to-blue-700/80 hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 border border-blue-500/30 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-sm sm:text-base">
                                        Proceed to Checkout
                                    </button>
                                    <button 
                                        onClick={clearCart}
                                        className="w-full bg-gradient-to-r from-red-600/60 to-red-700/60 hover:from-red-600/80 hover:to-red-700/80 border border-red-500/30 text-red-100 hover:text-white font-medium py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-red-600/30 transition-all duration-300 shadow-lg text-sm sm:text-base"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Enhanced CSS Animations and Utilities */}
            <style jsx>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .line-clamp-1 {
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }
                
                .line-clamp-2 {
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
            `}</style>
        </div>
    );
};

export default Cart;
