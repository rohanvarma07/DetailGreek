import React from "react";
import carWash from "../assets/car-wash.png";
import detail from "../assets/detal.png";

const SellCategory = ({ onCategoryClick }) => {
    const categories = [
        {
            id: 1,
            name: "Car Wash Products",
            description: "High-quality car wash products for a spotless shine.",
            image: carWash,
            items: ["Shampoos", "Soaps", "Cleaners", "Degreasers"]
        },
        {
            id: 2,
            name: "Detailing Tools",
            description: "Professional tools for perfect car detailing results.",
            image: carWash, // You can replace with different images
            items: ["Microfiber Towels", "Brushes", "Applicators", "Buckets"]
        },
        {
            id: 3,
            name: "Protection Products",
            description: "Advanced protection for paint, interior, and more.",
            image: carWash, // You can replace with different images
            items: ["Wax", "Sealants", "Ceramic Coatings", "UV Protection"]
        },
        {
            id: 4,
            name: "Interior Care",
            description: "Keep your car's interior looking and feeling fresh.",
            image: carWash, // You can replace with different images
            items: ["Leather Care", "Fabric Cleaners", "Dashboard Care", "Air Fresheners"]
        }
    ];

    const handleCategoryClick = (cat) => {
        if (onCategoryClick) {
            onCategoryClick(cat);
        }
    };

    return (
        <section className="py-16 bg-gradient-to-b from-transparent to-slate-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">Sell</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Explore our comprehensive range of premium car care products designed to keep your vehicle looking its absolute best
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {categories.map((cat) => (
                        <div 
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat)}
                            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                        >
                            {/* Category Image */}
                            <div className="relative overflow-hidden rounded-xl mb-6">
                                <img 
                                    src={detail} 
                                    alt={cat.name} 
                                    className="w-full h-48 sm:h-40 lg:h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>

                            {/* Category Content */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                    {cat.name}
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {cat.description}
                                </p>

                                {/* Items List */}
                                <div className="space-y-2">
                                    {cat.items.map((item, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-400">
                                            <svg className="w-3 h-3 text-blue-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                {/* View Products Button */}
                                <div className="pt-4 border-t border-white/10">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCategoryClick(cat);
                                        }}
                                        className="w-full bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-teal-500/10 backdrop-blur-md border border-white/20 text-gray-300 font-semibold py-2 px-4 rounded-lg hover:from-indigo-500/20 hover:via-violet-500/20 hover:to-teal-500/20 hover:border-white/30 hover:text-white transition-all duration-300 text-sm"
                                    >
                                        View Products
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Can't Find What You're Looking For?
                        </h3>
                        <p className="text-gray-300 mb-6">
                            Contact our experts to help you find the perfect products for your specific car care needs.
                        </p>
                        <button className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-md border border-white/20 text-white font-semibold py-3 px-8 rounded-xl hover:from-emerald-500/20 hover:via-teal-500/20 hover:to-cyan-500/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/20">
                            Contact Expert
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellCategory;    