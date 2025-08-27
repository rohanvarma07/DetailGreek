import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:9090/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dg-auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle different error scenarios silently
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem('dg-auth-token');
          localStorage.removeItem('dg-user');
          toast.error('Session expired. Please login again.');
          window.location.href = '/login';
          break;
          
        case 403:
          toast.error('Access denied. You don\'t have permission.');
          break;
          
        case 404:
          // Don't show error for 404s as they might be expected
          break;
          
        case 500:
          toast.error('Server error. Please try again later.');
          break;
          
        default:
          // Only show error for unexpected status codes
          if (status >= 500) {
            toast.error(data?.message || 'An error occurred.');
          }
      }
      
      return Promise.reject(new Error(data?.message || `Error ${status}`));
    } else if (error.request) {
      // Network error - no response received - fail silently
      return Promise.reject(new Error('Network error'));
    } else {
      // Request setup error
      return Promise.reject(error);
    }
  }
);

// Utility function to map frontend category names to backend category names
const mapCategoryName = (frontendCategoryName) => {
  const categoryMapping = {
    'Car Wash Products': 'car_wash',
    'Detailing Tools': 'detailing_tools', 
    'Protection Products': 'protection',
    'Interior Care': 'interior_care'
  };
  
  return categoryMapping[frontendCategoryName] || frontendCategoryName.toLowerCase().replace(/\s+/g, '_');
};

// Connection status checker
export const checkBackendConnection = async () => {
  try {
    console.log('🔍 Testing backend connection...');
    const response = await apiClient.get('/products');
    console.log(`✅ Backend connected - Found ${response.length} products`);
    return true;
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    return false;
  }
};

// Enhanced API services
export const apiService = {
  // Authentication
  auth: {
    login: async (credentials) => {
      const response = await apiClient.post('/auth/login', credentials);
      
      // Store auth token if provided
      if (response.token) {
        localStorage.setItem('dg-auth-token', response.token);
        localStorage.setItem('dg-user', JSON.stringify(response.user));
      }
      
      return response;
    },

    register: async (userData) => {
      return await apiClient.post('/auth/register', userData);
    },

    logout: async () => {
      try {
        await apiClient.post('/auth/logout');
      } finally {
        // Clear local storage regardless of API response
        localStorage.removeItem('dg-auth-token');
        localStorage.removeItem('dg-user');
      }
    },

    verifyToken: async () => {
      return await apiClient.get('/auth/verify');
    },

    refreshToken: async () => {
      return await apiClient.post('/auth/refresh');
    }
  },

  // Products
  products: {
    getAll: async (params = {}) => {
      return await apiClient.get('/products', { params });
    },

    getById: async (id) => {
      return await apiClient.get(`/products/${id}`);
    },

    create: async (productData) => {
      // For form data with file upload
      const formData = new FormData();
      formData.append('prod_name', productData.prod_name);
      formData.append('prod_price', productData.prod_price);
      formData.append('prod_quantity', productData.prod_quantity);
      formData.append('prod_description', productData.prod_description);
      
      if (productData.image) {
        formData.append('image', productData.image);
      }

      return await apiClient.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
    },

    update: async (id, productData) => {
      const formData = new FormData();
      formData.append('prod_name', productData.prod_name);
      formData.append('prod_price', productData.prod_price);
      formData.append('prod_quantity', productData.prod_quantity);
      formData.append('prod_description', productData.prod_description);
      
      if (productData.image) {
        formData.append('image', productData.image);
      }

      return await apiClient.put(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
    },

    delete: async (id) => {
      return await apiClient.delete(`/products/${id}`);
    },

    // Additional methods for frontend needs
    search: async (query) => {
      // If your backend doesn't have search, we'll filter on frontend
      const products = await apiClient.get('/products');
      return products.filter(product => 
        product.prod_name.toLowerCase().includes(query.toLowerCase()) ||
        product.prod_description.toLowerCase().includes(query.toLowerCase())
      );
    },

    getByCategory: async (categoryName) => {
      try {
        // Map frontend category names to backend category IDs
        const categoryMapping = {
          'Car Wash Products': 1,
          'Detailing Tools': 2, 
          'Protection Products': 3,
          'Interior Care': 4
        };
        
        const categoryId = categoryMapping[categoryName];
        
        if (categoryId) {
          // Try to fetch products by category ID from your backend
          try {
            const response = await apiClient.get(`/products/category/${categoryId}`);
            return response;
          } catch (categoryError) {
            // Fallback: get all products and filter by category
            const allProducts = await apiClient.get('/products');
            const filteredProducts = allProducts.filter(product => 
              product.category && product.category.categoryId === categoryId
            );
            return filteredProducts;
          }
        } else {
          return await apiClient.get('/products');
        }
        
      } catch (error) {
        // Silently fail and let CategoryDetails handle fallback
        throw new Error('Backend unavailable');
      }
    },

    getFeatured: async () => {
      // Get all products and mark some as featured (you can add a featured field to your model)
      const products = await apiClient.get('/products');
      return products.slice(0, 6); // Return first 6 as featured
    },

    getPopular: async () => {
      // Get all products and return popular ones
      const products = await apiClient.get('/products');
      return products.slice(0, 3); // Return first 3 as popular
    }
  },

  // Categories
  categories: {
    getAll: async () => {
      try {
        return await apiClient.get('/categories');
      } catch (error) {
        // Silently fail and let components handle fallback
        throw new Error('Categories unavailable');
      }
    },

    getById: async (id) => {
      try {
        return await apiClient.get(`/categories/${id}`);
      } catch (error) {
        throw new Error('Category unavailable');
      }
    },

    getWithProducts: async (id) => {
      try {
        return await apiClient.get(`/categories/${id}/products`);
      } catch (error) {
        throw new Error('Category products unavailable');
      }
    }
  },

  // Cart
  cart: {
    get: async () => {
      return await apiClient.get('/cart');
    },

    add: async (productId, quantity = 1) => {
      return await apiClient.post('/cart/add', { productId, quantity });
    },

    update: async (itemId, quantity) => {
      return await apiClient.put(`/cart/items/${itemId}`, { quantity });
    },

    remove: async (itemId) => {
      return await apiClient.delete(`/cart/items/${itemId}`);
    },

    clear: async () => {
      return await apiClient.delete('/cart');
    },

    applyCoupon: async (couponCode) => {
      return await apiClient.post('/cart/coupon', { code: couponCode });
    }
  },

  // Orders
  orders: {
    create: async (orderData) => {
      return await apiClient.post('/orders', orderData);
    },

    getAll: async (params = {}) => {
      return await apiClient.get('/orders', { params });
    },

    getById: async (orderId) => {
      return await apiClient.get(`/orders/${orderId}`);
    },

    updateStatus: async (orderId, status) => {
      return await apiClient.patch(`/orders/${orderId}/status`, { status });
    },

    cancel: async (orderId) => {
      return await apiClient.post(`/orders/${orderId}/cancel`);
    }
  },

  // Portfolio
  portfolio: {
    getItems: async () => {
      return await apiClient.get('/portfolio');
    },

    getTestimonials: async () => {
      return await apiClient.get('/portfolio/testimonials');
    },

    getStats: async () => {
      return await apiClient.get('/portfolio/stats');
    }
  },

  // Contact & Support
  contact: {
    sendMessage: async (messageData) => {
      return await apiClient.post('/contact/message', messageData);
    },

    subscribe: async (email) => {
      return await apiClient.post('/contact/subscribe', { email });
    },

    getBusinessHours: async () => {
      return await apiClient.get('/contact/business-hours');
    }
  },

  // User Profile
  user: {
    getProfile: async () => {
      return await apiClient.get('/user/profile');
    },

    updateProfile: async (profileData) => {
      return await apiClient.put('/user/profile', profileData);
    },

    changePassword: async (passwordData) => {
      return await apiClient.post('/user/change-password', passwordData);
    },

    getAddresses: async () => {
      return await apiClient.get('/user/addresses');
    },

    addAddress: async (addressData) => {
      return await apiClient.post('/user/addresses', addressData);
    }
  },

  // Analytics (if needed)
  analytics: {
    track: async (event, data = {}) => {
      return await apiClient.post('/analytics/track', { event, data });
    }
  }
};

// Export default
export default apiService;
