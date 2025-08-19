import React from "react";
import { useCart } from "../context/CartContext";

const ProductShowCase = () => {
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
        // You can add a toast notification here in the future
    };
    const products = [
        {
            id: 1,
            name: "Premium Car Wax",
            description: "High-grade carnauba wax for superior shine and protection",
            price: "₹2,099",
            features: ["Carnauba Formula", "UV Protection", "Water Beading", "6-Month Durability"],
            popular: true
        },
        {
            id: 2,
            name: "Ceramic Coating Kit",
            description: "Professional-grade ceramic coating for long-lasting protection",
            price: "₹10,899",
            features: ["9H Hardness", "Hydrophobic Coating", "2-Year Protection", "Application Kit Included"],
            popular: false
        },
        {
            id: 3,
            name: "Microfiber Towel Set",
            description: "Ultra-soft microfiber towels for streak-free cleaning",
            price: "₹1,699",
            features: ["600 GSM Weight", "Lint-Free", "Machine Washable", "Pack of 6"],
            popular: false
        },
        {
            id: 4,
            name: "Leather Conditioner",
            description: "Premium leather care solution for interior protection",
            price: "₹1,399",
            features: ["Natural Oils", "UV Protection", "Crack Prevention", "Pleasant Scent"],
            popular: false
        },
        {
            id: 5,
            name: "Tire Shine Spray",
            description: "Long-lasting tire shine for that showroom finish",
            price: "₹1,099",
            features: ["Silicone-Free", "UV Protection", "Non-Greasy Formula", "Easy Application"],
            popular: false
        },
        {
            id: 6,
            name: "Detailing Tool Kit",
            description: "Complete set of professional detailing tools and brushes",
            price: "₹7,599",
            features: ["15-Piece Set", "Storage Case", "Professional Grade", "Multiple Brush Types"],
            popular: true
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-transparent to-slate-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Premium Car Care <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Products</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover our carefully curated collection of professional-grade car care products designed to maintain your vehicle's pristine condition
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            className={`relative group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 ${
                                product.popular ? 'ring-2 ring-blue-400/50' : ''
                            }`}
                        >
                            {/* Popular Badge */}
                            {product.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Product Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{product.description}</p>
                                </div>

                                {/* Features */}
                                <div className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-400">
                                            <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                {/* Price and CTA */}
                                <div className="pt-4 border-t border-white/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-white">{product.price}</span>
                                        <span className="text-sm text-gray-400">Starting from</span>
                                    </div>
                                    
                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Looking for Bulk Orders?
                        </h3>
                        <p className="text-gray-300 mb-6">
                            Contact us for wholesale pricing and custom product bundles for automotive professionals and enthusiasts.
                        </p>
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductShowCase;