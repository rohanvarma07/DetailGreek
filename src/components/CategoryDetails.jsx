import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductDetailView from './ProductDetailView';

const CategoryDetails = ({ category, onBack }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductDetail, setShowProductDetail] = useState(false);
    const { addToCart } = useCart();

    if (!category) return null;

    // Enhanced products data with more details
    const products = {
        1: [ // Car Wash Products
            { 
                id: 1, 
                name: "Premium Car Shampoo", 
                price: "₹2,499", 
                image: "/api/placeholder/400/300", 
                description: "Professional grade car shampoo with pH neutral formula",
                detailedDescription: "Our Premium Car Shampoo is specially formulated with advanced pH-neutral technology that gently removes dirt and grime while preserving your car's protective wax coating. Enriched with natural lubricants and foam boosters for a scratch-free wash experience.",
                features: ["pH Neutral Formula", "Scratch-Free", "Biodegradable", "Concentrated Formula"],
                specifications: {
                    "Volume": "500ml",
                    "Dilution Ratio": "1:200",
                    "pH Level": "7.0",
                    "Fragrance": "Fresh Citrus"
                },
                benefits: [
                    "Safe for all paint types and finishes",
                    "Creates rich, lubricating foam",
                    "Removes stubborn dirt and road grime",
                    "Environmentally friendly formula"
                ],
                usage: "Dilute 25ml in 5 liters of water. Apply with wash mitt in straight lines. Rinse thoroughly.",
                rating: 4.8,
                reviews: 124
            },
            { 
                id: 2, 
                name: "Foam Cannon Soap", 
                price: "₹1,999", 
                image: "/api/placeholder/400/300", 
                description: "Thick foam formula for pressure washers",
                detailedDescription: "Specially designed for foam cannons and pressure washers, this high-foaming formula creates thick, clingy foam that dwells on surfaces longer for superior cleaning power.",
                features: ["High Foam", "Pressure Washer Compatible", "Long Dwell Time", "Safe on All Surfaces"],
                specifications: {
                    "Volume": "1L",
                    "Foam Ratio": "1:10",
                    "Coverage": "Up to 20 cars",
                    "Scent": "Tropical"
                },
                benefits: [
                    "Maximum foam production",
                    "Extended contact time",
                    "Superior dirt encapsulation",
                    "Professional results at home"
                ],
                usage: "Mix 100ml with 1L water in foam cannon. Apply to vehicle and let dwell for 2-3 minutes before rinsing.",
                rating: 4.7,
                reviews: 89
            },
            { 
                id: 3, 
                name: "Waterless Car Wash", 
                price: "₹1,699", 
                image: "/api/placeholder/400/300", 
                description: "Clean your car without water",
                detailedDescription: "Revolutionary waterless wash formula that cleans, shines, and protects in one step. Perfect for quick touch-ups and eco-friendly washing.",
                features: ["No Water Required", "Scratch-Free", "UV Protection", "Quick Application"],
                specifications: {
                    "Volume": "750ml",
                    "Coverage": "15-20 washes",
                    "Application": "Spray & Wipe",
                    "Drying Time": "Instant"
                },
                benefits: [
                    "Saves water and time",
                    "Perfect for apartments",
                    "Adds protective coating",
                    "Safe on all surfaces"
                ],
                usage: "Spray on dirty surface, wipe with microfiber towel in straight lines, flip towel and buff to shine.",
                rating: 4.6,
                reviews: 67
            }
        ],
        2: [ // Detailing Tools
            { 
                id: 5, 
                name: "Microfiber Towel Set", 
                price: "₹2,999", 
                image: "/api/placeholder/400/300", 
                description: "Professional grade microfiber towels",
                detailedDescription: "Premium 380 GSM microfiber towels designed for professional detailing. Ultra-soft fibers safely lift dirt and debris while being gentle on all surfaces.",
                features: ["380 GSM", "Lint-Free", "Scratch-Free", "Machine Washable"],
                specifications: {
                    "Set Size": "5 Towels",
                    "Dimensions": "40cm x 40cm",
                    "Weight": "380 GSM",
                    "Composition": "80% Polyester, 20% Polyamide"
                },
                benefits: [
                    "Superior absorption capacity",
                    "Lint and streak-free finish",
                    "Durable and long-lasting",
                    "Safe for all vehicle surfaces"
                ],
                usage: "Use damp for cleaning, dry for polishing. Wash separately in cold water without fabric softener.",
                rating: 4.9,
                reviews: 156
            },
            { 
                id: 6, 
                name: "Detailing Brush Kit", 
                price: "₹3,499", 
                image: "/api/placeholder/400/300", 
                description: "Complete brush set for all surfaces",
                detailedDescription: "Professional 8-piece brush kit with varying bristle softness for different surfaces. From delicate paint to tough wheel cleaning.",
                features: ["8-Piece Set", "Various Bristle Types", "Ergonomic Handles", "Color Coded"],
                specifications: {
                    "Kit Size": "8 Brushes",
                    "Handle Material": "Non-slip rubber",
                    "Bristle Types": "Natural & Synthetic",
                    "Sizes": "Various"
                },
                benefits: [
                    "Complete detailing solution",
                    "Safe for all surfaces",
                    "Professional results",
                    "Durable construction"
                ],
                usage: "Select appropriate brush for surface. Use gentle circular motions. Clean brushes after each use.",
                rating: 4.8,
                reviews: 92
            }
        ],
        3: [ // Protection Products
            { 
                id: 9, 
                name: "Ceramic Coating", 
                price: "₹8,999", 
                image: "/api/placeholder/400/300", 
                description: "9H hardness ceramic protection",
                detailedDescription: "Professional-grade ceramic coating that provides unmatched protection with 9H hardness. Creates a permanent bond with your paint for years of protection against UV rays, chemicals, and environmental contaminants.",
                features: ["9H Hardness", "UV Protection", "Chemical Resistant", "5-Year Durability"],
                specifications: {
                    "Volume": "30ml",
                    "Coverage": "1-2 vehicles",
                    "Cure Time": "24 hours",
                    "Durability": "5+ years"
                },
                benefits: [
                    "Maximum scratch resistance",
                    "Permanent paint protection",
                    "Enhanced gloss and depth",
                    "Self-cleaning properties"
                ],
                usage: "Apply to clean, decontaminated paint in cool conditions. Work in 2x2 sections. Allow to cure for 24 hours.",
                rating: 4.8,
                reviews: 78
            },
            { 
                id: 10, 
                name: "Carnauba Wax", 
                price: "₹4,599", 
                image: "/api/placeholder/400/300", 
                description: "Premium Brazilian carnauba wax",
                detailedDescription: "Grade #1 Brazilian carnauba wax provides deep, warm shine with excellent water beading. Hand-harvested from Copernicia prunifera palm trees.",
                features: ["Grade #1 Carnauba", "Deep Gloss", "Water Repellent", "Natural Protection"],
                specifications: {
                    "Volume": "200g",
                    "Carnauba Content": "51%",
                    "Coverage": "8-10 applications",
                    "Origin": "Brazil"
                },
                benefits: [
                    "Unmatched depth and warmth",
                    "Superior water beading",
                    "Natural UV protection",
                    "Show car finish"
                ],
                usage: "Apply thin layer with applicator pad. Allow to haze for 5-10 minutes. Buff with microfiber towel.",
                rating: 4.7,
                reviews: 134
            }
        ],
        4: [ // Interior Care
            { 
                id: 13, 
                name: "Leather Conditioner", 
                price: "₹2,699", 
                image: "/api/placeholder/400/300", 
                description: "Keeps leather soft and supple",
                detailedDescription: "Premium leather conditioner formulated with natural oils and UV protectants. Restores and maintains leather's natural softness while providing protection against cracking and fading.",
                features: ["Natural Oils", "UV Protection", "Anti-Crack Formula", "Pleasant Scent"],
                specifications: {
                    "Volume": "250ml",
                    "Coverage": "20-25 sq ft",
                    "Base": "Water-based",
                    "Fragrance": "Leather Scent"
                },
                benefits: [
                    "Prevents cracking and drying",
                    "Restores natural flexibility",
                    "UV protection prevents fading",
                    "Maintains factory appearance"
                ],
                usage: "Clean leather first. Apply thin layer with microfiber cloth. Allow to penetrate for 10 minutes, then buff excess.",
                rating: 4.6,
                reviews: 92
            },
            { 
                id: 14, 
                name: "Fabric Protector", 
                price: "₹2,199", 
                image: "/api/placeholder/400/300", 
                description: "Repels stains and spills",
                detailedDescription: "Advanced nano-technology fabric protector creates an invisible barrier against stains, spills, and UV damage on all fabric surfaces.",
                features: ["Nano Protection", "Stain Resistant", "UV Blocking", "Breathable"],
                specifications: {
                    "Volume": "400ml",
                    "Coverage": "2-3 vehicles",
                    "Protection": "6 months",
                    "Technology": "Nano-coating"
                },
                benefits: [
                    "Invisible protection barrier",
                    "Easy spill cleanup",
                    "Maintains fabric breathability",
                    "Long-lasting protection"
                ],
                usage: "Vacuum fabric first. Spray evenly 6 inches away. Allow to dry completely before use.",
                rating: 4.5,
                reviews: 76
            }
        ]
    };

    const categoryProducts = products[category.id] || [];

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowProductDetail(true);
    };

    const handleBackToProducts = () => {
        setShowProductDetail(false);
        setSelectedProduct(null);
    };

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            features: product.features
        });
    };

    // Show product detail view if a product is selected
    if (showProductDetail && selectedProduct) {
        return (
            <ProductDetailView 
                product={selectedProduct} 
                onBack={handleBackToProducts}
                onAddToCart={handleAddToCart}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            {/* Floating Car Emojis Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Large floating cars */}
                <div className="absolute top-10 left-10 text-6xl opacity-10 blur-sm animate-bounce" style={{animationDelay: '0s', animationDuration: '6s'}}>🚗</div>
                <div className="absolute top-32 right-20 text-5xl opacity-15 blur-sm animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}}>🚙</div>
                <div className="absolute top-64 left-1/4 text-4xl opacity-20 blur-sm animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}>🚕</div>
                <div className="absolute top-80 right-1/3 text-6xl opacity-10 blur-sm animate-pulse" style={{animationDelay: '3s', animationDuration: '7s'}}>🏎️</div>
                <div className="absolute bottom-32 left-16 text-5xl opacity-15 blur-sm animate-bounce" style={{animationDelay: '4s', animationDuration: '6s'}}>🚘</div>
                <div className="absolute bottom-20 right-10 text-4xl opacity-20 blur-sm animate-pulse" style={{animationDelay: '5s', animationDuration: '5s'}}>🚖</div>
                <div className="absolute top-1/2 left-10 text-3xl opacity-25 blur-sm animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4s'}}>🚌</div>
                <div className="absolute top-1/3 right-1/4 text-5xl opacity-10 blur-sm animate-pulse" style={{animationDelay: '2.5s', animationDuration: '6s'}}>🚐</div>
                
                {/* Mobile responsive smaller cars */}
                <div className="hidden sm:block absolute top-96 left-1/2 text-4xl opacity-15 blur-sm animate-bounce" style={{animationDelay: '3.5s', animationDuration: '5s'}}>🛻</div>
                <div className="hidden md:block absolute bottom-1/2 right-16 text-6xl opacity-10 blur-sm animate-pulse" style={{animationDelay: '4.5s', animationDuration: '7s'}}>🚗</div>
                <div className="hidden lg:block absolute top-20 left-1/3 text-3xl opacity-20 blur-sm animate-bounce" style={{animationDelay: '5.5s', animationDuration: '4s'}}>🚙</div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 py-4 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        
                        {/* Category emoji indicator */}
                        <div className="text-2xl opacity-60">
                            {category.id === 1 ? '🧽' : category.id === 2 ? '🛠️' : category.id === 3 ? '🛡️' : '🪑'}
                        </div>
                    </div>

                    {/* Minimal Category Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3 sm:mb-4 tracking-wide">
                            {category.name}
                        </h1>
                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-light">
                            {category.description}
                        </p>
                    </div>

                    {/* Minimal Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {categoryProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
                                onClick={() => handleProductClick(product)}
                            >
                                {/* Minimal Product Image */}
                                <div className="relative overflow-hidden h-40 sm:h-48">
                                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                                        <div className="text-4xl sm:text-5xl opacity-60">
                                            {product.id <= 3 ? '🧴' : product.id <= 6 ? '🧽' : product.id <= 10 ? '✨' : '🪑'}
                                        </div>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
                                        ⭐ {product.rating}
                                    </div>
                                </div>

                                {/* Minimal Product Info */}
                                <div className="p-4 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-medium text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                                        {product.description}
                                    </p>
                                    
                                    {/* Minimal Features */}
                                    <div className="flex gap-2 mb-4 overflow-x-auto">
                                        {product.features.slice(0, 2).map((feature, index) => (
                                            <span key={index} className="text-xs bg-blue-500/15 text-blue-300 px-2 py-1 rounded-full whitespace-nowrap border border-blue-500/20">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    {/* Price and Action */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl sm:text-2xl font-semibold text-blue-400">
                                            {product.price}
                                        </span>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToCart(product);
                                            }}
                                            className="bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm backdrop-blur-sm border border-white/10"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Minimal Empty State */}
                    {categoryProducts.length === 0 && (
                        <div className="text-center py-12 sm:py-16">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-12 max-w-md mx-auto">
                                <div className="text-4xl mb-4 opacity-60">🚧</div>
                                <h3 className="text-xl sm:text-2xl font-light text-white mb-3">
                                    Coming Soon
                                </h3>
                                <p className="text-gray-400 text-sm sm:text-base">
                                    New products arriving soon
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryDetails;
