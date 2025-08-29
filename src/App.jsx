import { useState, useEffect } from 'react'
import './App.css'
import { CartProvider } from './context/CartContext'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Hero from './components/hero'
import SellCategory from './components/SellCategory'
import ProductShowCaseWrapper from './components/ProductShowCaseWrapper'
import CategoryDetails from './components/CategoryDetails'
import Footer from './components/Footer'
import Cart from './components/Cart'
import About from './components/About'
import Login from './components/Login'
import Portfolio from './components/Portfolio'
import apiService from './services/apiService'

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'cart', 'about', 'category', 'login', or 'portfolio'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [user, setUser] = useState(null); // User authentication state
  const [isFirstVisit, setIsFirstVisit] = useState(false); // Track if it's user's first visit

  // Load user and view state from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dg-user');
    const hasVisited = localStorage.getItem('dg-visited');
    const savedView = localStorage.getItem('dg-current-view');
    const savedCategory = localStorage.getItem('dg-selected-category');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('dg-user');
      }
    }
    
    // Restore the previous view and category if they exist
    if (savedView && savedView !== 'home') {
      setCurrentView(savedView);
      
      // If returning to category view, restore the selected category
      if (savedView === 'category' && savedCategory) {
        try {
          setSelectedCategory(JSON.parse(savedCategory));
        } catch (error) {
          console.error('Error parsing saved category:', error);
          localStorage.removeItem('dg-selected-category');
          setCurrentView('home'); // Fallback to home if category can't be restored
        }0
      }
    }
    
    // Check if it's user's first visit
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('dg-visited', 'true');
    }
  }, []);

  // Save current view to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dg-current-view', currentView);
  }, [currentView]);

  // Save selected category to localStorage whenever it changes
  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem('dg-selected-category', JSON.stringify(selectedCategory));
    } else {
      localStorage.removeItem('dg-selected-category');
    }
  }, [selectedCategory]);

  const showCart = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setCurrentView('cart');
  };

  const showHome = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setCurrentView('home');
    setSelectedCategory(null);
    // Clear saved view state when explicitly going home
    localStorage.removeItem('dg-current-view');
    localStorage.removeItem('dg-selected-category');
  };

  const showAbout = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setCurrentView('about');
  };

  const showLogin = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setCurrentView('login');
  };

  const showPortfolio = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setCurrentView('portfolio');
  };

  const showCategoryDetails = (category) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setSelectedCategory(category);
    setCurrentView('category');
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await apiService.auth.login({ email, password });
      const userData = response.user || { email };
      setUser(userData);
      localStorage.setItem('dg-user', JSON.stringify(userData));
      // Clear view state and redirect to home after login
      localStorage.removeItem('dg-current-view');
      localStorage.removeItem('dg-selected-category');
      setCurrentView('home');
      setSelectedCategory(null);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await apiService.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('dg-user');
      // Also clear view state on logout
      localStorage.removeItem('dg-current-view');
      localStorage.removeItem('dg-selected-category');
      setCurrentView('home');
      setSelectedCategory(null);
    }
  };

  const handleGetStarted = () => {
    if (user) {
      // For logged-in users, provide contextual actions
      if (currentView === 'home') {
        // Check if we're already near the products section
        const productsElement = document.getElementById('products');
        const rect = productsElement?.getBoundingClientRect();
        const isProductsVisible = rect && rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isProductsVisible) {
          // If products are visible, show featured category
          showCategoryDetails({
            name: "Premium Detailing",
            description: "Professional-grade car detailing products",
            image: "/api/placeholder/400/300",
            products: [
              { id: 1, name: "Premium Car Wax", price: 29.99, image: "/api/placeholder/300/200" },
              { id: 2, name: "Microfiber Cloths Set", price: 19.99, image: "/api/placeholder/300/200" },
              { id: 3, name: "Wheel Cleaner Pro", price: 24.99, image: "/api/placeholder/300/200" }
            ]
          });
        } else {
          // Smooth scroll to products section
          setTimeout(() => {
            const element = document.getElementById('products');
            if (element) {
              element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }
          }, 100);
        }
      } else {
        setCurrentView('cart');
      }
    } else {
      // For new users, show a welcome experience
      if (isFirstVisit) {
        // First-time visitor experience
        import('react-hot-toast').then(({ default: toast }) => {
          toast.success('Welcome to Detail Greek! 🚗✨', {
            duration: 4000,
            position: 'top-center',
            style: {
              background: 'rgba(59, 130, 246, 0.15)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              fontSize: '16px',
              padding: '16px 24px',
              fontWeight: '500',
            },
            iconTheme: {
              primary: '#6366f1',
              secondary: 'white',
            },
          });
          
          // Show a follow-up message
          setTimeout(() => {
            toast('Discover premium car care products below 👇', {
              duration: 3000,
              position: 'top-center',
              style: {
                background: 'rgba(16, 185, 129, 0.15)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                fontSize: '14px',
                padding: '12px 20px',
              },
              icon: '👀',
            });
          }, 2000);
        });
        
        // Scroll to products after a moment
        setTimeout(() => {
          const element = document.getElementById('products');
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 1500);
        
        setIsFirstVisit(false);
      } else {
        // Returning visitor - encourage login
        showLogin();
      }
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
        <Toaster />
        {/* Enhanced Global Background Pattern */}
        <div className="fixed inset-0 -z-10">
          {/* Primary Professional Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-900/10 to-teal-900/15"></div>
          
          {/* Sophisticated Animated Gradient Orbs */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-600/15 via-violet-600/10 to-teal-600/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-teal-500/12 via-cyan-600/10 to-indigo-600/12 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-violet-600/8 via-purple-600/6 to-indigo-700/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Premium Mesh Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.6'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}>
          </div>
        </div>
        
        <Header 
          title="Detail Greek" 
          onShowCart={showCart} 
          onShowAbout={showAbout} 
          onShowHome={showHome} 
          onShowLogin={showLogin}
          onGetStarted={handleGetStarted}
          user={user}
          onLogout={handleLogout}
          isFirstVisit={isFirstVisit}
        />
        
        {currentView === 'home' ? (
          <>
            <div id="home" className="mb-16 lg:mb-24">
              <Hero onShowPortfolio={showPortfolio} />
            </div>
            <div id="categories" className="mb-16 lg:mb-24">
              <SellCategory onCategoryClick={showCategoryDetails} />
            </div>
            <div id="products" className="mb-16 lg:mb-24">
              <ProductShowCaseWrapper />
            </div>
            <div id="contact">
              <Footer />
            </div>
          </>
        ) : currentView === 'cart' ? (
          <Cart onBackToShop={showHome} />
        ) : currentView === 'category' ? (
          <CategoryDetails category={selectedCategory} onBack={showHome} />
        ) : currentView === 'login' ? (
          <Login onBack={showHome} onLogin={handleLogin} />
        ) : currentView === 'portfolio' ? (
          <Portfolio onBack={showHome} />
        ) : (
          <About onBackToHome={showHome} />
        )}
      </div>
    </CartProvider>
  )
}

export default App;