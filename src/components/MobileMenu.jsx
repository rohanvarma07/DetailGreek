import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MobileMenu = ({ isOpen, onClose, toggleCart, toggleLogin, user, onLogout }) => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    onClose(); // Close mobile menu first
    
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

  const menuItems = [
    { label: 'Home', sectionId: '#home' },
    { label: 'Services', sectionId: '#services' },
    { label: 'Products', sectionId: '#products' },
    { label: 'Categories', sectionId: '#categories' },
    { label: 'Contact', sectionId: '#contact' }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-optimized z-40 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-optimized border-l border-white/10 z-50 transform transition-transform duration-200 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button 
              onClick={onClose}
              className="p-2 text-white hover:text-yellow-400 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Navigation Items */}
          <div className="flex-1 py-6">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.sectionId)}
                className="block w-full text-left px-6 py-4 text-white hover:text-yellow-400 hover:bg-white/5 transition-all duration-200 border-b border-white/5 last:border-b-0"
              >
                <span className="text-lg font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          
          {/* Bottom Actions */}
          <div className="p-6 border-t border-white/10 space-y-4">
            {/* Cart */}
            <button 
              onClick={() => {
                toggleCart();
                onClose();
              }}
              className="flex items-center space-x-3 w-full p-3 text-white hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5 6m0 0h8.5" />
              </svg>
              <span>Cart ({getTotalItems()})</span>
            </button>
            
            {/* User Section */}
            {user ? (
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">
                      {user.firstName ? user.firstName.charAt(0) : user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {user.firstName ? `${user.firstName} ${user.lastName}` : user.email}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                
                {/* Logout Button */}
                <button 
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              /* Login Button */
              <button 
                onClick={() => {
                  toggleLogin();
                  onClose();
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
