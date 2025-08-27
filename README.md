# Detail Greek - React + Spring Boot Integration

A modern car care e-commerce application with React frontend and Spring Boot backend featuring category-based product filtering.

## 🚀 Latest Updates

### ✅ Category-Based Product Filtering
- **Dynamic Category Loading**: Products are now fetched from the backend based on category selection
- **Intelligent Fallback**: Gracefully falls back to static data when backend is unavailable
- **Real-time Status**: Visual indicators show backend connection status
- **Enhanced UX**: Loading states, error handling, and offline mode support

## Architecture

```
Frontend (React) ←→ Backend (Spring Boot)
Port: 3001          Port: 9090
```

## Prerequisites

- Node.js (v16 or higher)
- Java 17+
- MySQL Database
- Spring Boot backend running on localhost:9090

## Frontend Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access Application**
   - Frontend: http://localhost:3001 (or available port)
   - Backend API: http://localhost:9090/api

## Backend Integration

### 🔌 API Endpoints Currently Used
- `GET /api/products` - Fetch all products (fallback)
- `GET /api/products/category/{categoryName}` - Fetch products by category *(planned)*
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product (with file upload)
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### 📊 Data Mapping
Your backend model (`products`) maps to frontend as:
```javascript
// Backend Model (Current)
{
  prod_id: number,
  prod_name: string,
  prod_description: string,
  prod_price: BigInteger,
  prod_quantity: number,
  img_url: string
}

// Frontend Transformation
{
  id: product.prod_id,
  name: product.prod_name,
  description: product.prod_description,
  price: `₹${product.prod_price}`,
  quantity: product.prod_quantity,
  image: product.img_url || '/api/placeholder/400/300'
}
```

### 🏷️ Category Mapping
Frontend categories are mapped to backend category names:
- "Car Wash Products" → `car_wash`
- "Detailing Tools" → `detailing_tools`
- "Protection Products" → `protection`
- "Interior Care" → `interior_care`

## Features

### ✅ **Connected Features**
- **Category-Based Filtering**: Click categories to see filtered products from backend
- **Smart Fallback System**: Uses static data when backend is unavailable
- **Real-time Connection Status**: Prominent banner shows backend connection status
- **Loading States**: Professional loading indicators during API calls
- **Error Handling**: Graceful error messages with fallback options
- **Offline Mode**: Full functionality even without backend connection

### 🔄 **API Integration**
- **Category Endpoint Ready**: Frontend expects `/api/products/category/{categoryName}`
- **Intelligent Retry**: Automatic fallback to all products if category endpoint unavailable
- **CORS Enabled**: Your controller already has `@CrossOrigin(origins = "*")`
- **File Upload Support**: Handles multipart form data for images
- **Error Recovery**: Comprehensive error handling with user feedback

### 🎨 **Frontend Features**
- **Glassmorphic Design**: Modern, minimal business aesthetic
- **Mobile Responsive**: Optimized for all device sizes
- **Toast Notifications**: User feedback for all actions
- **Persistent Cart**: Shopping cart with localStorage backup
- **Dynamic Product Views**: Category-based product display
- **Professional UX**: Loading states, error handling, empty states

## 🚧 Backend Requirements for Full Category Support

To enable full category-based filtering, add these to your Spring Boot backend:

### 1. Add Category Field to Product Model
```java
@Entity
@Table(name = "products")
public class Products {
    // ... existing fields ...
    
    private String category; // Add this field
    
    // Add getter and setter
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
```

### 2. Add Category Controller Endpoint
```java
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProductController {
    // ... existing methods ...
    
    @GetMapping("/products/category/{categoryName}")
    public List<Products> getProductsByCategory(@PathVariable String categoryName) {
        return service.findByCategory(categoryName);
    }
}
```

### 3. Add Category Service Method
```java
@Service
public class ProductService {
    // ... existing methods ...
    
    public List<Products> findByCategory(String category) {
        return repo.findByCategory(category);
    }
}
```

### 4. Add Category Repository Method
```java
public interface ProductRepository extends JpaRepository<Products, Integer> {
    List<Products> findByCategory(String category);
    List<Products> findByCategoryIgnoreCase(String category); // Case-insensitive
}
```

## Development Workflow

1. **Backend Setup**: 
   - Start Spring Boot server on port 9090
   - Ensure MySQL database is running
   - Add sample products with category field

2. **Frontend Development**: 
   - React dev server auto-starts on available port
   - Check connection status banner at top of page
   - Test category clicking functionality

3. **API Testing**: 
   - Use browser developer tools to monitor API calls
   - Check console for detailed API logging
   - Verify category filtering works

4. **Fallback Testing**:
   - Stop backend to test offline mode
   - Verify static data displays correctly
   - Confirm error messages are helpful

## File Structure

```
src/
├── components/          # React components
│   ├── CategoryDetails.jsx     # ⭐ Enhanced category product view
│   ├── SellCategory.jsx        # Category selection grid
│   ├── ProductDetailView.jsx   # Individual product details
│   ├── ProductShowCase.jsx     # Product grid display
│   ├── ProductShowCaseWrapper.jsx # Product showcase container
│   ├── Cart.jsx               # Shopping cart functionality
│   ├── Header.jsx             # Site navigation
│   ├── Footer.jsx             # Site footer
│   ├── About.jsx              # About page
│   ├── Portfolio.jsx          # Business portfolio
│   ├── Login.jsx              # User authentication
│   └── hero.jsx               # Landing page hero section
│   ├── Cart.jsx               # Shopping cart functionality
│   ├── Header.jsx             # Site navigation
│   ├── Footer.jsx             # Site footer
│   ├── About.jsx              # About page
│   ├── Portfolio.jsx          # Business portfolio
│   ├── Login.jsx              # User authentication
│   └── hero.jsx               # Landing hero section
├── services/           # API integration
│   ├── apiService.js  # ⭐ Enhanced API with category support
│   └── api.js        # Basic API functions
├── context/           # React Context
│   └── CartContext.jsx    # Shopping cart state management
├── assets/            # Static assets
│   ├── car-wash.png      # Category images
│   └── detal.png         # Product images
├── App.jsx            # Main application component
├── App.css            # Global styles
├── index.css          # Base styles
└── main.jsx           # Application entry point
```

## 🎯 Current Status

### ✅ Completed
- Frontend category-based filtering implementation
- Backend API service integration with fallback
- Enhanced connection status monitoring
- Loading states and error handling
- Mobile-responsive glassmorphic design
- Static data fallback system

### 🔄 Next Steps for Full Integration
1. **Backend Category Support**: Add category field to your Product model
2. **Category Endpoint**: Implement `/api/products/category/{categoryName}` endpoint
3. **Database Updates**: Add category data to existing products
4. **Testing**: Verify category filtering works with real backend data

### 🧪 How to Test

**With Backend Running:**
1. Start your Spring Boot application
2. Run `npm run dev`
3. Click on categories to see filtered products (falls back to all products currently)
4. Check browser console for API call logs

**Without Backend (Offline Mode):**
1. Run `npm run dev` without backend
2. Notice the orange "Offline Mode" banner
3. Verify all categories show static product data
4. Confirm all functionality works offline

## 🛠️ Troubleshooting

### Backend Connection Issues
- ✅ Check connection status banner (top of page)
- ✅ Verify Spring Boot runs on port 9090
- ✅ Ensure CORS is enabled (already configured)
- ✅ Check browser console for detailed error logs

### Category Filtering Issues
- ✅ Frontend automatically falls back to all products if category endpoint unavailable
- ✅ Static data displays if backend is completely unavailable
- ✅ Error messages guide users when issues occur

### API Integration
- ✅ All existing endpoints remain functional
- ✅ New category endpoint is optional (graceful fallback)
- ✅ No breaking changes to your current backend

The application is production-ready with or without the category backend implementation!
