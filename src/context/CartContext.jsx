import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

// Load cart data from localStorage
const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('detailGreekCart');
        return savedCart ? JSON.parse(savedCart) : { items: [] };
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        return { items: [] };
    }
};

// Save cart data to localStorage
const saveCartToStorage = (cartState) => {
    try {
        localStorage.setItem('detailGreekCart', JSON.stringify(cartState));
    } catch (error) {
        console.error('Error saving cart to storage:', error);
    }
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }]
                };
            }
        }
        case 'REMOVE_FROM_CART': {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        }
        case 'UPDATE_QUANTITY': {
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ).filter(item => item.quantity > 0)
            };
        }
        case 'CLEAR_CART': {
            return {
                ...state,
                items: []
            };
        }
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, loadCartFromStorage());

    // Save to localStorage whenever cart state changes
    useEffect(() => {
        saveCartToStorage(state);
    }, [state]);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        toast.success(`${product.name} added to cart!`, {
            duration: 3000,
            position: 'top-right',
            style: {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
            },
            iconTheme: {
                primary: '#60a5fa',
                secondary: 'white',
            },
        });
    };

    const removeFromCart = (id) => {
        const item = state.items.find(item => item.id === id);
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
        if (item) {
            toast.error(`${item.name} removed from cart`, {
                duration: 2000,
                position: 'top-right',
                style: {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                },
            });
        }
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
        toast.success('Cart cleared!', {
            duration: 2000,
            position: 'top-right',
            style: {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
            },
        });
    };

    const getCartTotal = () => {
        return state.items.reduce((total, item) => {
            const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
            return total + (price * item.quantity);
        }, 0);
    };

    const getCartItemsCount = () => {
        return state.items.reduce((total, item) => total + item.quantity, 0);
    };

    const value = {
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
