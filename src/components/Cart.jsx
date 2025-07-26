import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const CartItem = ({ image, title, price, quantity, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-200 hover:border-yellow-400/30">
      <div className="w-full sm:w-16 h-32 sm:h-16 flex-shrink-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <h3 className="text-white font-semibold mb-1 line-clamp-2 text-sm sm:text-base">{title}</h3>
        <p className="text-yellow-400 font-bold text-lg">{price}</p>
      </div>
      
      <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto space-x-3">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onUpdateQuantity(quantity - 1)}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/10 text-white rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-200 transform hover:scale-110 touch-target"
          >
            <span className="text-lg font-bold">-</span>
          </button>
          <span className="text-white font-medium w-8 text-center text-lg">{quantity}</span>
          <button 
            onClick={() => onUpdateQuantity(quantity + 1)}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-white/10 text-white rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-200 transform hover:scale-110 touch-target"
          >
            <span className="text-lg font-bold">+</span>
          </button>
        </div>
        
        <button 
          onClick={onRemove}
          className="p-2 sm:p-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full transition-all duration-200 transform hover:scale-110 touch-target"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Cart = ({ onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px) for a swipe to be detected
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isRightSwipe) {
      onClose();
    }
  };

  // Prevent body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 cart-backdrop z-40 transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Cart Container - Responsive */}
      <div className="fixed inset-0 z-50 flex justify-end">
        <div 
          className={`
            w-full sm:w-96 lg:w-[450px] xl:w-[500px] 
            h-full bg-black/95 backdrop-blur-xl 
            border-l border-white/10 
            cart-slide
            transform transition-all duration-300 ease-out 
            animate-in slide-in-from-right
            shadow-2xl
          `}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-xl z-10">
              {/* Mobile swipe indicator */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 sm:hidden">
                <div className="w-12 h-1 bg-white/30 rounded-full animate-pulse"></div>
              </div>
              
              <div className="animate-in fade-in duration-500 mt-3 sm:mt-0">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Shopping Cart</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                </p>
                <p className="text-xs text-gray-500 mt-1 sm:hidden">Swipe right to close</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-full transition-all duration-200 transform hover:scale-110 animate-in fade-in duration-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6">
              <div className="space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="animate-in slide-in-from-right duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CartItem
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        quantity={item.quantity}
                        onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                        onRemove={() => removeFromCart(item.id)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 animate-in fade-in duration-500">
                    <div className="transform transition-all duration-300 hover:scale-105">
                      <div className="w-16 h-16 mx-auto mb-4 relative">
                        <svg className="w-16 h-16 text-gray-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5 6m0 0h8.5" />
                        </svg>
                        <div className="absolute inset-0 border-2 border-yellow-400/20 rounded-full animate-spin opacity-30"></div>
                      </div>
                      <p className="text-gray-400 text-lg mb-2">Your cart is empty</p>
                      <p className="text-gray-500 text-sm mb-6">Add some amazing products to get started!</p>
                      <button 
                        onClick={onClose}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 hover-lift transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-white/10 bg-black/80 backdrop-blur-xl space-y-4 animate-in slide-in-from-bottom duration-500">
                <div className="flex justify-between items-center text-white">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl sm:text-3xl font-bold text-yellow-400 animate-in fade-in duration-700">
                    ${getTotalPrice()}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-base sm:text-lg rounded-lg hover:from-yellow-500 hover:to-yellow-600 hover-lift transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-yellow-400/25">
                    Proceed to Checkout
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full px-6 py-3 border border-white/30 text-white rounded-lg hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
