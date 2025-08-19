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
            <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
                        <p className="text-gray-300 mb-8">Start shopping to add some amazing car care products to your cart!</p>
                        <button 
                            onClick={onBackToShop}
                            className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
                    <p className="text-gray-300">Review your selected car care products</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                                <div className="flex items-center space-x-4">
                                    {/* Product Icon */}
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                                        <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.features.slice(0, 2).map((feature, index) => (
                                                <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price and Quantity */}
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-white mb-2">{formatPrice(item.price)}</div>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                                            >
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                </svg>
                                            </button>
                                            <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                                            >
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
                            <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>
                            
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-300">{item.name} × {item.quantity}</span>
                                        <span className="text-white">
                                            ₹{(parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-4 mb-6">
                                <div className="flex justify-between text-lg font-bold text-white">
                                    <span>Total</span>
                                    <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
                                    Proceed to Checkout
                                </button>
                                <button 
                                    onClick={clearCart}
                                    className="w-full bg-red-600/20 border border-red-500/30 text-red-300 font-semibold py-3 px-6 rounded-xl hover:bg-red-600/30 transition-all duration-300"
                                >
                                    Clear Cart
                                </button>
                                <button 
                                    onClick={onBackToShop}
                                    className="block text-center text-gray-300 hover:text-white transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
