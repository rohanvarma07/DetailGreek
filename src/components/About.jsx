import React, { useEffect } from 'react';

const About = ({ onBackToHome }) => {
    // Scroll to top when About component mounts
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    const teamMembers = [
        {
            id: 1,
            name: "Alex Rodriguez",
            role: "Founder & CEO",
            experience: "15+ years",
            specialty: "Ceramic Coating Expert",
            image: "AR"
        },
        {
            id: 2,
            name: "Sarah Chen",
            role: "Head of Operations",
            experience: "10+ years",
            specialty: "Quality Assurance",
            image: "SC"
        },
        {
            id: 3,
            name: "Michael Kumar",
            role: "Technical Specialist",
            experience: "8+ years",
            specialty: "Paint Correction",
            image: "MK"
        }
    ];

    const stats = [
        { number: "5000+", label: "Happy Customers" },
        { number: "15+", label: "Years Experience" },
        { number: "98%", label: "Customer Satisfaction" },
        { number: "24/7", label: "Support Available" }
    ];

    const values = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Quality First",
            description: "We never compromise on the quality of our products and services."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Innovation",
            description: "Constantly evolving with the latest car care technologies and techniques."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            title: "Customer Care",
            description: "Your satisfaction is our top priority, always."
        }
    ];

    return (
        <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <div className="mb-8">
                    <button 
                        onClick={onBackToHome}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </button>
                </div>

                {/* Hero Section */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Detail Greek</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Crafting automotive perfection since 2009. We're passionate about making your vehicle look its absolute best with premium products and expert care.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-300 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                Detail Greek began with a simple mission: to provide car enthusiasts with the highest quality detailing products and services. What started as a small garage operation has grown into a trusted name in automotive care.
                            </p>
                            <p>
                                Our founder, Alex Rodriguez, discovered his passion for car detailing while restoring classic cars in his spare time. Frustrated by the lack of premium products available, he decided to create his own line of professional-grade car care solutions.
                            </p>
                            <p>
                                Today, we serve thousands of customers across the country, from weekend warriors to professional detailers, all united by their love for automotive perfection.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            <div className="w-full h-64 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                                <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <p className="text-center text-gray-300 mt-4 italic">
                                "Excellence is not a destination, it's a journey."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-20">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-6 text-white">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-20">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 group">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                                    {member.image}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                <p className="text-blue-400 font-medium mb-2">{member.role}</p>
                                <p className="text-gray-400 text-sm mb-2">{member.experience} experience</p>
                                <p className="text-gray-300 text-sm">{member.specialty}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-4xl mx-auto">
                        <h3 className="text-3xl font-bold text-white mb-6">
                            Ready to Experience the Difference?
                        </h3>
                        <p className="text-xl text-gray-300 mb-8">
                            Join thousands of satisfied customers who trust Detail Greek for their automotive care needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onClick={onBackToHome}
                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
                            >
                                Shop Products
                            </button>
                            <button className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
