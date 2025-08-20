import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = ({ onBackToShop }) => {
    const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

    const formatPrice = (price) => {
        const numPrice = parseFloat(price.replace('₹', '').replace(',', ''));
        return `₹${numPrice.toLocaleString('en-IN')}`;
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
                {/* Floating Car Emojis Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-16 left-8 text-5xl opacity-10 blur-sm animate-pulse" style={{animationDelay: '0s', animationDuration: '5s'}}>🛒</div>
                    <div className="absolute top-32 right-16 text-4xl opacity-15 blur-sm animate-bounce" style={{animationDelay: '1s', animationDuration: '6s'}}>🚗</div>
                    <div className="absolute bottom-32 left-20 text-6xl opacity-10 blur-sm animate-pulse" style={{animationDelay: '2s', animationDuration: '7s'}}>🏎️</div>
                    <div className="absolute bottom-16 right-12 text-3xl opacity-20 blur-sm animate-bounce" style={{animationDelay: '3s', animationDuration: '4s'}}>🚘</div>
                    <div className="hidden sm:block absolute top-1/2 left-16 text-4xl opacity-15 blur-sm animate-pulse" style={{animationDelay: '4s', animationDuration: '5s'}}>🧽</div>
                    <div className="hidden md:block absolute top-1/3 right-1/4 text-5xl opacity-10 blur-sm animate-bounce" style={{animationDelay: '5s', animationDuration: '6s'}}>✨</div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 pt-20 pb-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center py-12 sm:py-16">
                            <div className="text-6xl mb-8 opacity-60">🛒</div>
                            <h2 className="text-2xl sm:text-3xl font-light text-white mb-4 tracking-wide">Your Cart is Empty</h2>
                            <p className="text-gray-400 mb-8 text-sm sm:text-base">Start shopping to add some amazing car care products to your cart!</p>
                            <button 
                                onClick={onBackToShop}
                                className="bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/10"
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            {/* Floating Car Emojis Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 text-6xl opacity-10 blur-sm animate-bounce" style={{animationDelay: '0s', animationDuration: '6s'}}>🚗</div>
                <div className="absolute top-32 right-20 text-5xl opacity-15 blur-sm animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}}>🚙</div>
                <div className="absolute top-64 left-1/4 text-4xl opacity-20 blur-sm animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}>🚕</div>
                <div className="absolute top-80 right-1/3 text-6xl opacity-10 blur-sm animate-pulse" style={{animationDelay: '3s', animationDuration: '7s'}}>🏎️</div>
                <div className="absolute bottom-32 left-16 text-5xl opacity-15 blur-sm animate-bounce" style={{animationDelay: '4s', animationDuration: '6s'}}>🚘</div>
                <div className="absolute bottom-20 right-10 text-4xl opacity-20 blur-sm animate-pulse" style={{animationDelay: '5s', animationDuration: '5s'}}>🛒</div>
                <div className="hidden sm:block absolute top-1/2 left-10 text-3xl opacity-25 blur-sm animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4s'}}>🧽</div>
                <div className="hidden md:block absolute top-1/3 right-1/4 text-5xl opacity-10 blur-sm animate-pulse" style={{animationDelay: '2.5s', animationDuration: '6s'}}>✨</div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 pt-20 pb-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Minimal Header */}
                    <div className="mb-8 sm:mb-12">
                        <h1 className="text-3xl sm:text-4xl font-light text-white mb-2 tracking-wide">Shopping Cart</h1>
                        <p className="text-gray-400 text-sm sm:text-base">Review your selected car care products</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Minimal Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                        {/* Product Icon */}
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                                            <div className="text-2xl sm:text-3xl opacity-60">
                                                {item.id <= 3 ? '🧴' : item.id <= 6 ? '🧽' : item.id <= 10 ? '✨' : '🪑'}
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg sm:text-xl font-medium text-white mb-1 line-clamp-1">{item.name}</h3>
                                            <p className="text-gray-400 text-sm mb-2 line-clamp-1">{item.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.features && item.features.slice(0, 2).map((feature, index) => (
                                                    <span key={index} className="text-xs bg-blue-500/15 text-blue-300 px-2 py-1 rounded-full border border-blue-500/20">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price and Quantity */}
                                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start space-x-4 sm:space-x-0 sm:space-y-3">
                                            <div className="text-xl sm:text-2xl font-semibold text-blue-400">{formatPrice(item.price)}</div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors border border-white/10"
                                                >
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>
                                                <span className="text-white font-semibold w-8 text-center text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors border border-white/10"
                                                >
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-300 text-sm transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Minimal Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 sticky top-24">
                                <h3 className="text-xl sm:text-2xl font-medium text-white mb-6">Order Summary</h3>
                                
                                <div className="space-y-3 mb-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-gray-400 line-clamp-1">{item.name} × {item.quantity}</span>
                                            <span className="text-white font-medium">
                                                ₹{(parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-white/10 pt-4 mb-6">
                                    <div className="flex justify-between text-lg font-semibold text-white">
                                        <span>Total</span>
                                        <span className="text-blue-400">₹{getCartTotal().toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/10">
                                        Proceed to Checkout
                                    </button>
                                    <button 
                                        onClick={clearCart}
                                        className="w-full bg-red-600/20 border border-red-500/30 text-red-300 font-medium py-3 px-6 rounded-xl hover:bg-red-600/30 transition-all duration-300"
                                    >
                                        Clear Cart
                                    </button>
                                    <button 
                                        onClick={onBackToShop}
                                        className="block w-full text-center text-gray-400 hover:text-white transition-colors py-2"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
