import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import MobileMenu from './components/MobileMenu';
import Cart from './components/Cart';
import LoginPage from './components/LoginPage';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import { CartProvider } from './context/CartContext';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Handle smooth scrolling for navigation links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    console.log('User logged in:', userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <CartProvider>
      <Router>
        <Navigation 
          isMobileMenuOpen={isMobileMenuOpen} 
          toggleMobileMenu={toggleMobileMenu}
          toggleCart={toggleCart}
          toggleLogin={toggleLogin}
          user={user}
          onLogout={handleLogout}
        />
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu}
          toggleCart={toggleCart}
          toggleLogin={toggleLogin}
          user={user}
          onLogout={handleLogout}
        />
        {isCartOpen && <Cart onClose={closeCart} />}
        {isLoginOpen && <LoginPage onClose={closeLogin} onLogin={handleLogin} />}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
