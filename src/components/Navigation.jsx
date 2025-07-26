import { useNavigate, useLocation } from 'react-router-dom';
import cartIcon from '../assets/shopping-cart.png';
import img from '../assets/DG.png';
import { useCart } from '../context/CartContext';

const Navigation = ({ isMobileMenuOpen, toggleMobileMenu, toggleCart, toggleLogin, user, onLogout }) => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-optimized border-b border-white/10 gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div 
              className="relative group cursor-pointer"
              onClick={handleLogoClick}
            >
              <img 
                src={img} 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full ring-2 ring-yellow-400/50 transition-transform duration-300 group-hover:scale-110" 
                alt="DetailGreek Logo" 
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div 
              className="hidden sm:block cursor-pointer"
              onClick={handleLogoClick}
            >
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-blue-400 bg-clip-text text-transparent">
                DetailGreek
              </h1>
              <p className="text-xs text-gray-400 font-medium">Premium Car Care</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('#home')}
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('#services')}
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('#products')}
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('#categories')}
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
            >
              Categories
            </button>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
            >
              Contact
            </button>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button 
              onClick={toggleCart}
              className="relative p-2 text-white hover:text-yellow-400 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5 6m0 0h8.5" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            </button>
            
            {/* Login/User Section */}
            {user ? (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">
                      {user.firstName ? user.firstName.charAt(0) : user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white text-sm">
                    {user.firstName ? `${user.firstName} ${user.lastName}` : user.email}
                  </span>
                </div>
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 border border-white/30 text-white font-semibold rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={toggleLogin}
                className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 hover-lift transition-all duration-200 shadow-lg hover:shadow-yellow-400/25"
              >
                Login
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1 relative z-50"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
