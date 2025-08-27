import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import ProductDetailView from './ProductDetailView';
import { apiService } from '../services/apiService';
import toast from 'react-hot-toast';

const CategoryDetails = ({ category, onBack }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductDetail, setShowProductDetail] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isBackendAvailable, setIsBackendAvailable] = useState(true);
    const { addToCart } = useCart();

    // Scroll to top when component mounts or category changes
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [category]);

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

    // Static fallback data with emoji images
    const staticProductsData = {
        1: [ // Car Wash Products
            { 
                id: 1, 
                name: "Premium Car Shampoo", 
                price: "₹2,499", 
                image: "🧴", // Emoji fallback
                imageEmoji: "🧴",
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
                image: "🫧", // Emoji fallback
                imageEmoji: "🫧",
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
                image: "💧", // Emoji fallback
                imageEmoji: "💧",
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
                image: "🧽", // Emoji fallback
                imageEmoji: "🧽",
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
                image: "🖌️", // Emoji fallback
                imageEmoji: "🖌️",
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
                image: "🛡️", // Emoji fallback
                imageEmoji: "🛡️",
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
                image: "✨", // Emoji fallback
                imageEmoji: "✨",
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
                image: "🧴", // Emoji fallback
                imageEmoji: "🧴",
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
                image: "🧽", // Emoji fallback
                imageEmoji: "🧽",
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

    // Fetch products from backend when category changes
    useEffect(() => {
        const fetchProducts = async () => {
            if (!category) return;
            
            setLoading(true);
            setError(null);
            
            try {
                const backendProducts = await apiService.products.getByCategory(category.name);
                
                if (backendProducts && backendProducts.length > 0) {
                    // Transform backend products to match frontend structure
                    const transformedProducts = backendProducts.map(product => {
                        // Get emoji fallback based on category
                        const getCategoryEmoji = (categoryId) => {
                            switch(categoryId) {
                                case 1: return '🧴'; // Car Wash Products
                                case 2: return '🧽'; // Detailing Tools  
                                case 3: return '✨'; // Protection Products
                                case 4: return '🪑'; // Interior Care
                                default: return '🛒';
                            }
                        };

                        return {
                            id: product.prodId,
                            name: product.prodName,
                            price: `₹${product.prodPrice}`,
                            description: product.prodDescription,
                            detailedDescription: product.prodDescription || 'Professional quality product for your car care needs.',
                            image: product.imgUrl ? `http://localhost:9090${product.imgUrl}` : getCategoryEmoji(product.category?.categoryId || category.id),
                            imageEmoji: getCategoryEmoji(product.category?.categoryId || category.id),
                            features: ['Professional Grade', 'High Quality', 'Easy to Use', 'Durable'],
                            specifications: {
                            "Stock Status": product.prodQuantity > 0 ? 'In Stock' : 'Out of Stock',
                            "Quantity Available": product.prodQuantity.toString(),
                            "Product ID": product.prodId.toString(),
                            "Category": product.category ? product.category.categoryName : category.name
                            },
                            benefits: [
                            'Premium quality ingredients',
                            'Long-lasting results',
                            'Professional grade formula',
                            'Safe for all vehicle types'
                            ],
                            usage: 'Follow product instructions for best results. Test on small area first.',
                            rating: 4.5 + (Math.random() * 0.4), // Random rating between 4.5-4.9
                            reviews: Math.floor(Math.random() * 150) + 25, // Random reviews 25-175
                            quantity: product.prodQuantity,
                            categoryId: product.category ? product.category.categoryId : null,
                            categoryName: product.category ? product.category.categoryName : null
                        };
                    });
                    
                    setProducts(transformedProducts);
                    setIsBackendAvailable(true);
                } else {
                    // No products found, use static data
                    setProducts(staticProductsData[category.id] || []);
                    setIsBackendAvailable(false);
                }
            } catch (error) {
                // Silently fallback to static data
                setProducts(staticProductsData[category.id] || []);
                setError(null); // Don't show error to user
                setIsBackendAvailable(false);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    const categoryProducts = products;

    if (!category) return null;

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
                onBack={handleBackToProducts}
                onAddToCart={handleAddToCart}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Geometric Pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}>
                </div>
                
                {/* Premium Floating Elements */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/5 via-cyan-500/3 to-indigo-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '0s', animationDuration: '8s'}}></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-violet-500/5 via-purple-500/3 to-pink-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}}></div>
                <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-emerald-500/5 via-teal-500/3 to-cyan-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s', animationDuration: '10s'}}></div>
                <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-orange-500/5 via-amber-500/3 to-yellow-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '6s', animationDuration: '7s'}}></div>
            </div>

            {/* Main Content with Professional Spacing */}
            <div className="relative z-10 pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-10 lg:pb-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                    {/* Professional Header Section */}
                    <div className="flex items-center justify-between mb-6 sm:mb-10 lg:mb-14">
                        <button
                            onClick={onBack}
                            className="group flex items-center bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2 hover:bg-gray-700/80 hover:border-gray-600/60 transition-all duration-200"
                        >
                            <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-300 group-hover:-translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors duration-200">Back to Categories</span>
                        </button>
                        
                        {/* Professional Category Badge */}
                        <div className="flex items-center bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 rounded-lg px-3 py-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                            <span className="text-gray-300 text-sm font-medium">{categoryProducts.length} Products</span>
                        </div>
                    </div>

                    {/* Professional Category Header */}
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                                <span className="block opacity-95">{category.name}</span>
                            </h1>
                            <div className="w-16 h-px bg-gray-500 mx-auto mb-4 sm:mb-6"></div>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-400 font-normal leading-relaxed max-w-3xl mx-auto">
                                {category.description}
                            </p>
                        </div>
                    </div>

                    {/* Professional Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-20 sm:py-32">
                            <div className="relative">
                                {/* Main Loading Container */}
                                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/30 rounded-xl p-12 sm:p-16 max-w-lg mx-auto">
                                    {/* Professional Loading Animation */}
                                    <div className="relative flex items-center justify-center mb-8">
                                        {/* Single rotating ring */}
                                        <div className="w-12 h-12 border-2 border-gray-600 border-t-gray-400 rounded-full animate-spin"></div>
                                    </div>
                                    
                                    {/* Professional Loading Text */}
                                    <div className="text-center space-y-4">
                                        <h3 className="text-xl sm:text-2xl font-medium text-white">
                                            Loading Products
                                        </h3>
                                        <p className="text-gray-400 text-base">
                                            Fetching {category.name.toLowerCase()}...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Professional Error State */}
                    {error && !loading && (
                        <div className="mb-6 p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <div className="text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-300 text-sm font-medium">Connection Issue</p>
                                    <p className="text-gray-500 text-xs">Showing cached data instead</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Professional Products Grid */}
                    {!loading && (
                        <div className="space-y-10">
                            {/* Clean Products Grid with Better Spacing */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {categoryProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className="group relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/40 rounded-lg overflow-hidden hover:bg-gray-800/50 hover:border-gray-600/60 transition-all duration-200 cursor-pointer hover:scale-[1.01]"
                                        onClick={() => handleProductClick(product)}
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                            animation: 'slideInUp 0.6s ease-out forwards'
                                        }}
                                    >
                                        {/* Professional Product Image Area */}
                                        <div className="relative h-40 sm:h-44 bg-gray-700/20 overflow-hidden">
                                            {/* Image Container */}
                                            {product.image && product.image.startsWith('http') ? (
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            
                                            {/* Professional Emoji Fallback */}
                                            <div 
                                                className={`absolute inset-0 flex items-center justify-center bg-gray-700/10 ${
                                                    product.image && product.image.startsWith('http') ? 'hidden' : 'flex'
                                                }`}
                                            >
                                                <div className="text-4xl sm:text-5xl opacity-60 group-hover:opacity-80 transition-opacity duration-200">
                                                    {product.imageEmoji || product.image || '�'}
                                                </div>
                                            </div>
                                            
                                            {/* Professional SQL Image Indicator */}
                                            {product.image && product.image.startsWith('http') && (
                                                <div className="absolute top-3 right-3 bg-gray-600/60 rounded-full p-1">
                                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                                </div>
                                            )}
                                            
                                            {/* Subtle Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>
                                        </div>

                                        {/* Professional Product Info Section */}
                                        <div className="p-5 space-y-4">
                                            {/* Product Title - Clean and Professional */}
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium text-white group-hover:text-gray-200 transition-colors duration-200 leading-tight line-clamp-1">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-1 group-hover:text-gray-300 transition-colors duration-200">
                                                    {product.description}
                                                </p>
                                            </div>
                                            
                                            {/* Professional Rating (if available) */}
                                            {product.rating && (
                                                <div className="flex items-center space-x-1">
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg 
                                                                key={i} 
                                                                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-gray-400' : 'text-gray-600'}`} 
                                                                fill="currentColor" 
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-500 text-xs">({product.reviews})</span>
                                                </div>
                                            )}
                                            
                                            {/* Professional Price and Action Section */}
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-700/40">
                                                <div>
                                                    <span className="text-xl font-medium text-white group-hover:text-gray-200 transition-colors duration-200">
                                                        {product.price}
                                                    </span>
                                                </div>
                                                
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddToCart(product);
                                                    }}
                                                    className="group/btn bg-gray-700/40 hover:bg-gray-600/60 border border-gray-600/50 hover:border-gray-500/70 text-white py-2 px-4 rounded transition-all duration-200 text-sm font-medium"
                                                >
                                                    <span className="flex items-center space-x-1">
                                                        <span>Add</span>
                                                        <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Professional Empty State */}
                            {categoryProducts.length === 0 && (
                                <div className="text-center py-20 sm:py-32">
                                    <div className="max-w-md mx-auto">
                                        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/40 rounded-lg p-12 sm:p-16">
                                            {/* Professional Icon */}
                                            <div className="relative mb-8">
                                                <div className="text-4xl mb-4 opacity-50">
                                                    {error ? '�' : '📦'}
                                                </div>
                                            </div>
                                            
                                            <h3 className="text-xl sm:text-2xl font-medium text-white mb-4">
                                                {error ? 'No Products Available' : 'Coming Soon'}
                                            </h3>
                                            <p className="text-gray-400 text-base leading-relaxed mb-6">
                                                {error ? 'Unable to load products at this time' : 'New products arriving soon'}
                                            </p>
                                            
                                            {/* Professional Action Button */}
                                            <button 
                                                onClick={onBack}
                                                className="bg-gray-700/40 hover:bg-gray-600/60 border border-gray-600/50 hover:border-gray-500/70 text-white py-3 px-6 rounded transition-all duration-200 text-sm font-medium"
                                            >
                                                Browse Other Categories
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            {/* CSS Animations */}
            <style jsx>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
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

export default CategoryDetails;
