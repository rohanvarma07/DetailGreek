import React from "react";
import { useCart } from "../context/CartContext";

const ProductShowCase = ({ onProductView }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleProductView = (product) => {
        // Enhanced product data for detailed view
        const enhancedProduct = {
            ...product,
            detailedDescription: `${product.description}. This premium product is designed for professional results and easy application.`,
            specifications: {
                "Volume": "500ml",
                "Application": "Manual",
                "Coverage": "2-3 vehicles",
                "Durability": "6 months"
            },
            benefits: [
                "Professional grade quality",
                "Easy to apply",
                "Long-lasting results",
                "Safe for all surfaces"
            ],
            usage: "Clean surface thoroughly. Apply product evenly. Allow to cure as directed. Buff to desired finish.",
            rating: 4.6,
            reviews: 89
        };
        
        // Call the parent handler to show product details in a new page
        if (onProductView && typeof onProductView === 'function') {
            onProductView(enhancedProduct);
        }
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
        <section className="py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            {/* Floating Car Emojis Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 text-6xl opacity-10 blur-sm animate-bounce" style={{animationDelay: '0s', animationDuration: '6s'}}>🚗</div>
                <div className="absolute top-32 right-20 text-5xl opacity-15 blur-sm animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}}>🚙</div>
                <div className="absolute top-64 left-1/4 text-4xl opacity-20 blur-sm animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}>🚕</div>
                <div className="absolute top-80 right-1/3 text-6xl opacity-10 blur-sm animate-pulse" style={{animationDelay: '3s', animationDuration: '7s'}}>🏎️</div>
                <div className="absolute bottom-32 left-16 text-5xl opacity-15 blur-sm animate-bounce" style={{animationDelay: '4s', animationDuration: '6s'}}>🚘</div>
                <div className="absolute bottom-20 right-10 text-4xl opacity-20 blur-sm animate-pulse" style={{animationDelay: '5s', animationDuration: '5s'}}>🚖</div>
                <div className="hidden sm:block absolute top-1/2 left-10 text-3xl opacity-25 blur-sm animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4s'}}>🧽</div>
                <div className="hidden md:block absolute top-1/3 right-1/4 text-5xl opacity-10 blur-sm animate-pulse" style={{animationDelay: '2.5s', animationDuration: '6s'}}>✨</div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Minimal Section Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-wide">
                            Premium Car Care <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">Products</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto font-light">
                            Discover our carefully curated collection of professional-grade car care products
                        </p>
                    </div>

                    {/* Minimal Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {products.map((product) => (
                            <div 
                                key={product.id} 
                                className={`relative group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 ${
                                    product.popular ? 'ring-1 ring-blue-400/30' : ''
                                }`}
                            >
                                {/* Minimal Popular Badge */}
                                {product.popular && (
                                    <div className="absolute top-3 right-3 z-20">
                                        <span className="bg-blue-500/20 backdrop-blur-sm text-blue-300 px-2 py-1 rounded-full text-xs font-medium border border-blue-400/30">
                                            Popular
                                        </span>
                                    </div>
                                )}

                                {/* Minimal Product Icon */}
                                <div className="h-32 sm:h-40 bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                    <div className="text-4xl sm:text-5xl opacity-60">
                                        {product.id <= 2 ? '🧴' : product.id <= 4 ? '🧽' : '✨'}
                                    </div>
                                </div>

                                {/* Minimal Content */}
                                <div className="p-4 sm:p-6">
                                    <div className="space-y-3 sm:space-y-4">
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-medium text-white mb-2 line-clamp-1">{product.name}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{product.description}</p>
                                        </div>

                                        {/* Minimal Features */}
                                        <div className="flex flex-wrap gap-1">
                                            {product.features.slice(0, 2).map((feature, index) => (
                                                <span key={index} className="text-xs bg-blue-500/15 text-blue-300 px-2 py-1 rounded-full border border-blue-500/20">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Minimal Price and Actions */}
                                        <div className="pt-3 border-t border-white/10">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xl sm:text-2xl font-semibold text-blue-400">{product.price}</span>
                                                <span className="text-xs text-gray-500">Starting from</span>
                                            </div>
                                            
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        handleProductView(product);
                                                    }}
                                                    className="flex-1 bg-gradient-to-r from-slate-500/10 via-gray-500/10 to-zinc-500/10 hover:from-slate-500/20 hover:via-gray-500/20 hover:to-zinc-500/20 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm border border-white/10 cursor-pointer"
                                                >
                                                    View Details
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        handleAddToCart(product);
                                                    }}
                                                    className="flex-1 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-teal-500/10 backdrop-blur-md border border-white/20 hover:from-indigo-500/20 hover:via-violet-500/20 hover:to-teal-500/20 hover:border-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm cursor-pointer"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Minimal Call to Action */}
                    <div className="text-center mt-12 sm:mt-16">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
                            <h3 className="text-xl sm:text-2xl font-medium text-white mb-3 sm:mb-4">
                                Looking for Bulk Orders?
                            </h3>
                            <p className="text-gray-400 mb-6 text-sm sm:text-base">
                                Contact us for wholesale pricing and custom product bundles for automotive professionals and enthusiasts.
                            </p>
                            <button className="bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-amber-600/20 hover:from-amber-600/30 hover:via-orange-600/30 hover:to-amber-600/30 text-white font-medium py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductShowCase;