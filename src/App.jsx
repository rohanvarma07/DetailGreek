import { useState } from 'react'
import './App.css'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Hero from './components/hero'
import SellCategory from './components/SellCategory'
import ProductShowCaseWrapper from './components/ProductShowCaseWrapper'
import CategoryDetails from './components/CategoryDetails'
import Footer from './components/Footer'
import Cart from './components/Cart'
import About from './components/About'

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'cart', 'about', or 'category'
  const [selectedCategory, setSelectedCategory] = useState(null);

  const showCart = () => {
    setCurrentView('cart');
  };

  const showHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
  };

  const showAbout = () => {
    setCurrentView('about');
  };

  const showCategoryDetails = (category) => {
    setSelectedCategory(category);
    setCurrentView('category');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
        {/* Global Background Pattern */}
        <div className="fixed inset-0 -z-10">
          {/* Primary Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-cyan-500/10"></div>
          
          {/* Animated Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/15 to-blue-500/15 rounded-full blur-3xl animate-pulse delay-700"></div>
          
          {/* Subtle Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}>
          </div>
        </div>
        
        <Header title="Detail Greek" onShowCart={showCart} onShowAbout={showAbout} onShowHome={showHome} />
        
        {currentView === 'home' ? (
          <>
            <div id="home">
              <Hero />
            </div>
            <div id="categories">
              <SellCategory onCategoryClick={showCategoryDetails} />
            </div>
            <div id="products">
              <ProductShowCaseWrapper />
            </div>
            <div id="contact">
              <Footer />
            </div>
          </>
        ) : currentView === 'cart' ? (
          <div>
            <div className="pt-20 pb-4">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <button 
                  onClick={showHome}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Shop
                </button>
              </div>
            </div>
            <Cart onBackToShop={showHome} />
          </div>
        ) : currentView === 'category' ? (
          <div>
            <div className="pt-20 pb-4">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <button 
                  onClick={showHome}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Categories
                </button>
              </div>
            </div>
            <CategoryDetails category={selectedCategory} onBack={showHome} />
          </div>
        ) : (
          <About onBackToHome={showHome} />
        )}
      </div>
    </CartProvider>
  )
}

export default App;