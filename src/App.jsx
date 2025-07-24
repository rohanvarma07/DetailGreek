import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import MobileMenu from './components/MobileMenu';
import HeroBanner from './components/HeroBanner';
import ServicesSection from './components/ServicesSection';
import ProductsSection from './components/ProductsSection';
import CategoriesSection from './components/CategoriesSection';
import Footer from './components/Footer';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <>
      <Navigation 
        isMobileMenuOpen={isMobileMenuOpen} 
        toggleMobileMenu={toggleMobileMenu} 
      />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu} 
      />
      <HeroBanner />
      <ServicesSection />
      <ProductsSection />
      <CategoriesSection />
      <Footer />
    </>
  );
}

export default App;
