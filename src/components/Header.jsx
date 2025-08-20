import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Header = ({ title = "Detail Greek", onShowCart, onShowAbout, onShowHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { getCartItemsCount } = useCart();

  const cartCount = getCartItemsCount();

  const handleNavigation = (section) => {
    // First ensure we're on the home page
    if (onShowHome) {
      onShowHome();
    }
    
    // Then scroll to the section after a small delay to allow page transition
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
    
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-zinc-900/95 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-50 shadow-xl shadow-black/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <button 
              onClick={() => handleNavigation('home')}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 hover:scale-105 transition-transform duration-200"
            >
              <span className="text-white font-bold text-sm sm:text-lg">DG</span>
            </button>
            <button 
              onClick={() => handleNavigation('home')}
              className="text-base sm:text-lg lg:text-xl font-semibold text-white hover:text-blue-400 transition-colors duration-200"
            >
              {title}
            </button>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-1 lg:space-x-2 flex-1 justify-center">
              <button 
                onClick={() => handleNavigation('home')}
                className="px-3 py-2 text-sm lg:text-base text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all duration-200 font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('products')}
                className="px-3 py-2 text-sm lg:text-base text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all duration-200 font-medium"
              >
                Products
              </button>
              <button 
                onClick={() => handleNavigation('categories')}
                className="px-3 py-2 text-sm lg:text-base text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all duration-200 font-medium"
              >
                Categories
              </button>
              <button 
                onClick={onShowAbout}
                className="px-3 py-2 text-sm lg:text-base text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all duration-200 font-medium"
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="px-3 py-2 text-sm lg:text-base text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all duration-200 font-medium"
              >
                Contact
              </button>
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Desktop Actions */}
            {!isMobile && (
              <div className="flex items-center space-x-2 lg:space-x-3">
                <button className="px-3 py-2 text-sm lg:text-base text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200">
                  Login
                </button>
                
                <div className="relative">
                  <button 
                    onClick={onShowCart}
                    className="p-2 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6m1.5-6h0m9 0v0a1.5 1.5 0 00-3 0v0m3 0a1.5 1.5 0 003 0v0m-9 0h3m-3 0a1.5 1.5 0 01-3 0v0"/>
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-medium shadow-lg">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>
                
                <button className="px-3 py-2 text-sm lg:text-base bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25">
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button 
                className="p-2 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all duration-200"
                onClick={toggleMenu}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="border-t border-gray-700/50 bg-gradient-to-r from-slate-900/98 via-gray-900/98 to-zinc-900/98 backdrop-blur-md">
            <nav className="px-4 py-4 space-y-2">
              <button 
                onClick={() => handleNavigation('home')}
                className="block w-full text-left px-3 py-3 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200 font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('products')}
                className="block w-full text-left px-3 py-3 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200 font-medium"
              >
                Products
              </button>
              <button 
                onClick={() => handleNavigation('categories')}
                className="block w-full text-left px-3 py-3 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200 font-medium"
              >
                Categories
              </button>
              <button 
                onClick={() => {
                  onShowAbout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-3 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200 font-medium"
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="block w-full text-left px-3 py-3 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200 font-medium"
              >
                Contact
              </button>
              
              {/* Mobile Actions */}
              <div className="pt-4 border-t border-gray-700/50 mt-4">
                <div className="flex flex-col space-y-3">
                  <button className="w-full px-4 py-3 text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 text-left">
                    Login
                  </button>
                  
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <button 
                        onClick={onShowCart}
                        className="p-3 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all duration-200"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6m1.5-6h0m9 0v0a1.5 1.5 0 00-3 0v0m3 0a1.5 1.5 0 003 0v0m-9 0h3m-3 0a1.5 1.5 0 01-3 0v0"/>
                        </svg>
                        {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-medium shadow-lg">
                            {cartCount}
                          </span>
                        )}
                      </button>
                    </div>
                    
                    <button className="flex-1 ml-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg shadow-blue-500/25">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
