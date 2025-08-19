import React from 'react';

const Footer = () => {
    return (
        <footer className="relative py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-semibold text-white mb-4">Ready to Transform Your Vehicle?</h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Contact us today for a free consultation and experience the difference professional detailing makes.
                    </p>
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5">
                        Get Free Quote
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12 border-t border-gray-700/50">
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-blue-400 transition-colors cursor-pointer">Interior Detailing</li>
                            <li className="hover:text-blue-400 transition-colors cursor-pointer">Exterior Detailing</li>
                            <li className="hover:text-blue-400 transition-colors cursor-pointer">Paint Protection</li>
                            <li className="hover:text-blue-400 transition-colors cursor-pointer">Ceramic Coating</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-blue-400 transition-colors cursor-pointer">About Us</li>
                            <li className="hover:text-blue-400 transition-colors cursor-pointer">Our Process</li>
                            <li className="hover:text-blue-400 transition-colors cursor-pointer">Testimonials</li>
                            <li className="hover:text-blue-400 transition-colors cursor-pointer">Gallery</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Phone: (555) 123-4567</li>
                            <li>Email: info@detailgreek.com</li>
                            <li>Address: 123 Car Care St</li>
                            <li>Hours: Mon-Sat 8AM-6PM</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/30 border border-blue-400/20 rounded-lg flex items-center justify-center hover:from-blue-400/30 hover:to-blue-500/40 transition-all duration-300 cursor-pointer">
                                <span className="text-blue-400 text-sm font-semibold">f</span>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/30 border border-blue-400/20 rounded-lg flex items-center justify-center hover:from-blue-400/30 hover:to-blue-500/40 transition-all duration-300 cursor-pointer">
                                <span className="text-blue-400 text-sm font-semibold">ig</span>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/30 border border-blue-400/20 rounded-lg flex items-center justify-center hover:from-blue-400/30 hover:to-blue-500/40 transition-all duration-300 cursor-pointer">
                                <span className="text-blue-400 text-sm font-semibold">tw</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="text-center pt-8 mt-8 border-t border-gray-700/50">
                    <p className="text-gray-500 text-sm">
                        © 2025 Detail Greek. All rights reserved. | Professional automotive detailing services.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
