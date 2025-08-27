import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import toast from 'react-hot-toast';

const Portfolio = ({ onBack }) => {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    // Static fallback data
    const staticPortfolioItems = [
        {
            id: 1,
            title: "Luxury Car Dealership - Premium Motors",
            category: "Automotive",
            description: "Complete car care solution for luxury vehicle showroom with premium detailing services.",
            image: "🏢",
            services: ["Showroom Detailing", "Pre-Delivery Services", "Customer Care Packages"],
            results: "40% increase in customer satisfaction",
            year: "2024"
        },
        {
            id: 2,
            title: "Fleet Management - Corporate Solutions",
            category: "Commercial",
            description: "Large-scale fleet maintenance and detailing services for corporate clients.",
            image: "🚚",
            services: ["Fleet Washing", "Maintenance Programs", "Bulk Product Supply"],
            results: "30% cost reduction in maintenance",
            year: "2023"
        },
        {
            id: 3,
            title: "Auto Care Center - Express Wash",
            category: "Service Center",
            description: "Comprehensive car care center setup with professional-grade equipment and products.",
            image: "🏭",
            services: ["Equipment Setup", "Staff Training", "Product Supply Chain"],
            results: "50+ vehicles served daily",
            year: "2024"
        },
        {
            id: 4,
            title: "Premium Car Club - Elite Members",
            category: "Exclusive",
            description: "Exclusive car care services for high-end car club members and enthusiasts.",
            image: "🏆",
            services: ["Concierge Detailing", "Premium Products", "Exclusive Access"],
            results: "100% member retention rate",
            year: "2023"
        },
        {
            id: 5,
            title: "Automotive Workshop - Pro Garage",
            category: "Workshop",
            description: "Professional workshop partnership providing specialized car care solutions.",
            image: "🔧",
            services: ["Technical Support", "Product Training", "Quality Assurance"],
            results: "25% efficiency improvement",
            year: "2024"
        },
        {
            id: 6,
            title: "Car Rental Service - Clean Fleet",
            category: "Rental",
            description: "Maintaining pristine vehicle conditions for premium car rental services.",
            image: "🚗",
            services: ["Daily Cleaning", "Deep Detailing", "Quality Control"],
            results: "95% customer satisfaction",
            year: "2023"
        }
    ];

    const staticTestimonials = [
        {
            name: "Rajesh Kumar",
            company: "Premium Motors Ltd.",
            text: "Detail Greek transformed our showroom experience. Our customers now expect this level of quality.",
            rating: 5
        },
        {
            name: "Priya Sharma",
            company: "Corporate Fleet Solutions",
            text: "Outstanding service quality and reliability. They've become an integral part of our operations.",
            rating: 5
        },
        {
            name: "Vikram Singh",
            company: "Elite Car Club",
            text: "The attention to detail is exceptional. Our members are consistently impressed.",
            rating: 5
        }
    ];

    // Fetch data from backend and scroll to top
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        const fetchPortfolioData = async () => {
            try {
                setLoading(true);
                
                // Try to fetch from backend, fallback to static data
                try {
                    const [portfolioData, testimonialsData, statsData] = await Promise.allSettled([
                        apiService.portfolio.getItems(),
                        apiService.portfolio.getTestimonials(),
                        apiService.portfolio.getStats()
                    ]);

                    // Use backend data if available, otherwise use static data
                    setPortfolioItems(portfolioData.status === 'fulfilled' ? portfolioData.value : staticPortfolioItems);
                    setTestimonials(testimonialsData.status === 'fulfilled' ? testimonialsData.value : staticTestimonials);
                    setStats(statsData.status === 'fulfilled' ? statsData.value : {
                        businessPartners: 50,
                        vehiclesServiced: 10000,
                        satisfactionRate: 98,
                        supportAvailable: '24/7'
                    });
                } catch (backendError) {
                    console.log('Backend not available, using static data');
                    setPortfolioItems(staticPortfolioItems);
                    setTestimonials(staticTestimonials);
                    setStats({
                        businessPartners: 50,
                        vehiclesServiced: 10000,
                        satisfactionRate: 98,
                        supportAvailable: '24/7'
                    });
                }
            } catch (error) {
                console.error('Failed to fetch portfolio data:', error);
                toast.error('Failed to load portfolio data');
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolioData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 pt-20">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <button 
                    onClick={onBack}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </button>
            </div>

            {/* Hero Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 tracking-wide">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">Business Portfolio</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed">
                        Discover how Detail Greek has transformed automotive care experiences across diverse business sectors
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-2">
                                {loading ? '...' : `${stats.businessPartners || 50}+`}
                            </div>
                            <div className="text-gray-400 text-sm">Business Partners</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-teal-400 mb-2">
                                {loading ? '...' : `${Math.floor((stats.vehiclesServiced || 10000) / 1000)}K+`}
                            </div>
                            <div className="text-gray-400 text-sm">Vehicles Serviced</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-violet-400 mb-2">
                                {loading ? '...' : `${stats.satisfactionRate || 98}%`}
                            </div>
                            <div className="text-gray-400 text-sm">Satisfaction Rate</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-amber-400 mb-2">
                                {loading ? '...' : stats.supportAvailable || '24/7'}
                            </div>
                            <div className="text-gray-400 text-sm">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
                            Success Stories
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Explore our diverse portfolio of successful business partnerships and transformative solutions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(portfolioItems.length > 0 ? portfolioItems : staticPortfolioItems).map((item) => (
                            <div 
                                key={item.id}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                            >
                                {/* Project Image/Icon */}
                                <div className="h-48 bg-white/5 border-b border-white/10 flex items-center justify-center">
                                    <div className="text-6xl opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                                        {item.image}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-gray-500">{item.year}</span>
                                    </div>

                                    <h3 className="text-xl font-medium text-white mb-3 line-clamp-2">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                        {item.description}
                                    </p>

                                    {/* Services */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-300 mb-2">Services Provided:</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {item.services.map((service, index) => (
                                                <span key={index} className="text-xs bg-gray-500/20 text-gray-300 px-2 py-1 rounded-full">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Results */}
                                    <div className="pt-3 border-t border-white/10">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm text-green-400 font-medium">{item.results}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
                            Client Testimonials
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Hear what our business partners say about working with Detail Greek
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(testimonials.length > 0 ? testimonials : staticTestimonials).map((testimonial, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-300 italic mb-4 text-sm leading-relaxed">
                                    "{testimonial.text}"
                                </p>
                                <div>
                                    <div className="font-medium text-white text-sm">{testimonial.name}</div>
                                    <div className="text-gray-400 text-xs">{testimonial.company}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                        <h3 className="text-2xl lg:text-3xl font-light text-white mb-4">
                            Ready to Transform Your Business?
                        </h3>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                            Join our growing portfolio of successful business partnerships. Let's discuss how Detail Greek can elevate your automotive care standards.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-teal-500/20 hover:from-indigo-500/30 hover:via-violet-500/30 hover:to-teal-500/30 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30">
                                Schedule Consultation
                            </button>
                            <button className="bg-gradient-to-r from-slate-500/20 via-gray-500/20 to-zinc-500/20 hover:from-slate-500/30 hover:via-gray-500/30 hover:to-zinc-500/30 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20">
                                Download Portfolio
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
