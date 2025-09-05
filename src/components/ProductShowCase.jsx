import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import apiService from "../services/apiService";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const ProductShowCase = ({ onProductView }) => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAllProducts, setShowAllProducts] = useState(false);

    // Add custom styles for Swiper
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .swiper-pagination-bullet-custom {
                width: 12px !important;
                height: 12px !important;
                background: rgba(59, 130, 246, 0.3) !important;
                border: 1px solid rgba(59, 130, 246, 0.5) !important;
                opacity: 1 !important;
                margin: 0 6px !important;
            }
            .swiper-pagination-bullet-active-custom {
                background: rgba(59, 130, 246, 0.8) !important;
                border-color: rgba(59, 130, 246, 1) !important;
            }
            .premium-products-swiper .swiper-pagination {
                bottom: 0 !important;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const fetchedProducts = await apiService.products.getAll();
                
                // Transform backend data to match frontend structure
                const transformedProducts = fetchedProducts
                    .map(product => ({
                        id: product.prodId,
                        name: product.prodName,
                        description: product.prodDescription,
                        price: `₹${product.prodPrice?.toLocaleString()}`,
                        rawPrice: product.prodPrice,
                        quantity: product.prodQuantity,
                        image: product.imgUrl,
                        features: [
                            "Professional Grade",
                            "High Quality",
                            "Tested & Approved",
                            "Long Lasting"
                        ],
                        popular: product.prodId <= 2
                    }))
                    .filter(product => product.rawPrice > 500);
                
                setProducts(transformedProducts);
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError(err.message);
                toast.error('Failed to load products');
                
                // Fallback to static data if backend fails (also filtered)
                setProducts(getStaticProducts().filter(product => {
                    const priceValue = parseInt(product.price.replace(/[₹,]/g, ''));
                    return priceValue > 500;
                }));
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Static fallback products (Products above ₹500)
    const getStaticProducts = () => [
        {
            id: 1,
            name: "Premium Car Wax",
            description: "High-grade carnauba wax for superior shine and protection",
            price: "₹2,099",
            rawPrice: 2099,
            features: ["Carnauba Formula", "UV Protection", "Water Beading", "6-Month Durability"],
            popular: true
        },
        {
            id: 2,
            name: "Ceramic Coating Kit",
            description: "Professional-grade ceramic coating for long-lasting protection",
            price: "₹12,999",
            rawPrice: 12999,
            features: ["9H Hardness", "Hydrophobic Coating", "3-Year Protection", "Complete Application Kit"],
            popular: true
        },
        {
            id: 3,
            name: "Microfiber Towel Set",
            description: "Ultra-soft microfiber towels for streak-free cleaning",
            price: "₹1,699",
            rawPrice: 1699,
            features: ["600 GSM Weight", "Lint-Free", "Machine Washable", "Pack of 6"],
            popular: false
        },
        {
            id: 4,
            name: "Car Shampoo Concentrate",
            description: "Professional pH balanced car shampoo for safe cleaning",
            price: "₹899",
            rawPrice: 899,
            features: ["pH Balanced", "High Foam", "Gloss Enhancer", "1L Concentrate"],
            popular: false
        },
        {
            id: 5,
            name: "Leather Care Kit",
            description: "Complete leather cleaning and conditioning kit",
            price: "₹1,799",
            rawPrice: 1799,
            features: ["Cleaner & Conditioner", "UV Protection", "Natural Oils", "Applicator Included"],
            popular: false
        },
        {
            id: 6,
            name: "Paint Protection Film Kit",
            description: "Self-healing paint protection film for ultimate vehicle protection",
            price: "₹18,999",
            rawPrice: 18999,
            features: ["Self-Healing Technology", "UV Protection", "Crystal Clear", "Professional Installation Kit"],
            popular: false
        }
    ];

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
        
        // Call the parent handler to show product details without scrolling
        if (onProductView && typeof onProductView === 'function') {
            onProductView(enhancedProduct);
        }
    };

    // Render individual product card (reusable for both slider and grid)
    const renderProductCard = (product) => (
        <div className={`relative group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 h-full ${
            product.popular ? 'ring-1 ring-blue-400/30' : ''
        }`}>
            {/* Premium and Popular Badges */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                {/* Premium Badge - Products above ₹500 */}
                <span className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 backdrop-blur-sm text-emerald-100 px-3 py-1.5 rounded-full text-xs font-bold border-2 border-emerald-600 shadow-lg shadow-emerald-900/50">
                    ₹500+
                </span>
                {/* Popular Badge */}
                {product.popular && (
                    <span className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 backdrop-blur-sm text-blue-100 px-3 py-1.5 rounded-full text-xs font-bold border-2 border-blue-600 shadow-lg shadow-blue-900/50">
                        Popular
                    </span>
                )}
            </div>

            {/* Product Image */}
            <div className="h-32 sm:h-40 bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center relative overflow-hidden">
                {product.image && product.image !== '/uploads/' ? (
                    <img 
                        src={`http://localhost:9090${product.image}`}
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
                    className={`absolute inset-0 flex items-center justify-center ${
                        product.image && product.image !== '/uploads/' ? 'hidden' : 'flex'
                    }`}
                >
                    <div className="text-4xl sm:text-5xl opacity-60">
                        {product.id <= 2 ? '🧴' : product.id <= 4 ? '🧽' : '✨'}
                    </div>
                </div>
            </div>

            {/* Product Content */}
            <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                    <div>
                        <h3 className="text-lg sm:text-xl font-medium text-white mb-2 line-clamp-1">{product.name}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{product.description}</p>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="text-xs bg-blue-500/15 text-blue-300 px-2 py-1 rounded-full border border-blue-500/20">
                                {feature}
                            </span>
                        ))}
                    </div>

                    {/* Price and Actions */}
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
    );

    // Loading state
    if (loading) {
        return (
            <section className="py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-wide">
                            Loading <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">Products</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden animate-pulse">
                                <div className="h-32 sm:h-40 bg-white/10"></div>
                                <div className="p-4 sm:p-6 space-y-3">
                                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                                    <div className="h-8 bg-white/10 rounded w-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

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
                    {/* Premium Section Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-wide">
                            Quality Car Care <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">Products</span>
                        </h2>
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-6 py-2">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-amber-200 text-sm font-medium">Premium Selection Above ₹500</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto font-light">
                            Quality car care products above ₹500 for superior results and lasting protection
                        </p>
                    </div>

                    {/* Empty State for No Premium Products */}
                    {products.length === 0 && !loading && (
                        <div className="text-center py-16">
                            <div className="bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-sm border border-gray-700/40 rounded-2xl p-12 max-w-lg mx-auto">
                                <div className="text-6xl mb-6 opacity-50">🏆</div>
                                <h3 className="text-2xl font-light text-white mb-4">No Premium Products Available</h3>
                                <p className="text-gray-400 mb-6">
                                    We're currently updating our premium product collection above ₹500. Please check back soon!
                                </p>
                                <div className="text-sm text-gray-500">
                                    <p>Looking for other products? Browse our full catalog in Categories.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Premium Products - Conditional Slider or Grid */}
                    {products.length > 0 && (
                        <div className="premium-products-section">
                            {!showAllProducts ? (
                                /* Slider View */
                                <div className="relative">
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        spaceBetween={24}
                                        slidesPerView={1}
                                        navigation={{
                                            nextEl: '.swiper-button-next-custom',
                                            prevEl: '.swiper-button-prev-custom',
                                        }}
                                        pagination={{ 
                                            clickable: true,
                                            bulletClass: 'swiper-pagination-bullet-custom',
                                            bulletActiveClass: 'swiper-pagination-bullet-active-custom'
                                        }}
                                        autoplay={{
                                            delay: 4000,
                                            disableOnInteraction: false,
                                        }}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 2,
                                                spaceBetween: 20,
                                            },
                                            768: {
                                                slidesPerView: 3,
                                                spaceBetween: 24,
                                            },
                                            1024: {
                                                slidesPerView: 4,
                                                spaceBetween: 32,
                                            }
                                        }}
                                        className="premium-products-swiper !pb-16"
                                    >
                                        {products.map((product) => (
                                            <SwiperSlide key={product.id}>
                                                {renderProductCard(product)}
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    
                                    {/* Custom Navigation Buttons */}
                                    <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-full flex items-center justify-center text-white hover:bg-blue-600/30 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-full flex items-center justify-center text-white hover:bg-blue-600/30 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                /* Grid View - All Products */
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm border border-blue-500/20 rounded-lg px-6 py-3 inline-block">
                                            <span className="text-blue-200 text-sm font-medium">
                                                Showing all {products.length} premium products
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {products.map((product) => (
                                            <div key={product.id} className="transform hover:scale-105 transition-transform duration-200">
                                                {renderProductCard(product)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                        <div className="text-center mt-8 mb-12">
                            <button 
                                onClick={() => {
                                    setShowAllProducts(!showAllProducts);
                                    // Smooth scroll to products section when switching views
                                    if (!showAllProducts) {
                                        setTimeout(() => {
                                            document.querySelector('.premium-products-section')?.scrollIntoView({ 
                                                behavior: 'smooth',
                                                block: 'start'
                                            });
                                        }, 100);
                                    }
                                }}
                                className="bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-blue-600/20 hover:from-blue-600/30 hover:via-indigo-600/30 hover:to-blue-600/30 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 flex items-center gap-2"
                            >
                                {showAllProducts ? (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        Show Slider View
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        View All {products.length} Products
                                    </>
                                )}
                            </button>
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
    );
};

export default ProductShowCase;