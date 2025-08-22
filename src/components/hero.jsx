import React from 'react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden py-16 lg:py-24">
            <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center">
                    {/* Hero Content */}
                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-10 lg:mb-12 tracking-tight leading-tight">
                            Premium Auto
                            <span className="block bg-gradient-to-r from-indigo-400 via-teal-400 to-violet-500 bg-clip-text text-transparent font-normal mt-2 lg:mt-4">Detailing</span>
                        </h1>
                        
                        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-16 lg:mb-20 font-light leading-relaxed max-w-3xl mx-auto px-4">
                            Experience excellence in automotive care with our professional detailing services
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center mb-20 lg:mb-28">
                            <button className="px-10 lg:px-12 py-5 lg:py-6 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-teal-500/10 backdrop-blur-md border border-white/20 text-white text-lg lg:text-xl font-medium rounded-xl hover:from-indigo-500/20 hover:via-violet-500/20 hover:to-teal-500/20 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-0.5">
                                Book Service
                            </button>
                            <button className="px-10 lg:px-12 py-5 lg:py-6 border-2 border-gray-500/40 bg-gradient-to-r from-slate-500/5 via-gray-500/5 to-zinc-500/5 text-gray-300 text-lg lg:text-xl font-medium rounded-xl hover:border-gray-400/60 hover:text-gray-200 hover:from-slate-500/10 hover:via-gray-500/10 hover:to-zinc-500/10 transition-all duration-300 backdrop-blur-sm">
                                View Portfolio
                            </button>
                        </div>

                        {/* Key Services */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 xl:gap-16 mt-24 lg:mt-32">
                            <div className="text-center group">
                                <div className="w-18 h-18 lg:w-20 lg:h-20 mx-auto mb-6 lg:mb-8 bg-gradient-to-br from-indigo-500/20 to-teal-600/30 backdrop-blur-sm border border-indigo-400/20 rounded-2xl flex items-center justify-center group-hover:from-indigo-400/30 group-hover:to-teal-500/40 transition-all duration-300 group-hover:scale-105">
                                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Detailing</h3>
                                <p className="text-gray-400 text-sm lg:text-base">Interior & Exterior</p>
                            </div>
                            
                            <div className="text-center group">
                                <div className="w-18 h-18 lg:w-20 lg:h-20 mx-auto mb-6 lg:mb-8 bg-gradient-to-br from-violet-500/20 to-purple-600/30 backdrop-blur-sm border border-violet-400/20 rounded-2xl flex items-center justify-center group-hover:from-violet-400/30 group-hover:to-purple-500/40 transition-all duration-300 group-hover:scale-105">
                                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Protection</h3>
                                <p className="text-gray-400 text-sm lg:text-base">PPF & Ceramic</p>
                            </div>
                            
                            <div className="text-center group">
                                <div className="w-18 h-18 lg:w-20 lg:h-20 mx-auto mb-6 lg:mb-8 bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 backdrop-blur-sm border border-emerald-400/20 rounded-2xl flex items-center justify-center group-hover:from-emerald-400/30 group-hover:to-emerald-500/40 transition-all duration-300 group-hover:scale-105">
                                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Polishing</h3>
                                <p className="text-gray-400 text-sm lg:text-base">Paint Correction</p>
                            </div>
                            
                            <div className="text-center group">
                                <div className="w-18 h-18 lg:w-20 lg:h-20 mx-auto mb-6 lg:mb-8 bg-gradient-to-br from-orange-500/20 to-orange-600/30 backdrop-blur-sm border border-orange-400/20 rounded-2xl flex items-center justify-center group-hover:from-orange-400/30 group-hover:to-orange-500/40 transition-all duration-300 group-hover:scale-105">
                                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Maintenance</h3>
                                <p className="text-gray-400 text-sm lg:text-base">Regular Care</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};

export default Hero;
