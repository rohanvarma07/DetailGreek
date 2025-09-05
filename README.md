# Detail Greek - Premium Car Care E-Commerce Platform

A modern, responsive React-based e-commerce platform for premium car care products with integrated Spring Boot backend authentication.

## 🚀 Features

### Frontend Features
- **Modern React 18** with Vite for fast development
- **Professional UI/UX** with Tailwind CSS and glassmorphism design
- **Responsive Design** - Mobile-first approach, works on all devices
- **State Management** with React Context API
- **Client-side Routing** with view persistence on page reload
- **Advanced Shopping Cart** with local storage persistence
- **Real-time Notifications** using react-hot-toast
- **Professional Loading States** and error handling
- **Image Optimization** with lazy loading and fallbacks

### Backend Integration
- **Spring Boot Authentication** with BCrypt password encryption
- **User Registration & Login** with real-time email validation
- **Product Management** with category-based filtering
- **API Error Handling** with graceful fallbacks
- **CORS Configuration** for secure cross-origin requests

### E-Commerce Features
- **Product Catalog** with detailed product views
- **Category Navigation** with smooth transitions
- **Shopping Cart** with add/remove/update functionality
- **User Authentication** with remember me functionality
- **Professional Forms** with validation and error feedback
- **Search & Filter** capabilities

## 📁 Project Structure

```
/Users/blackpanther/Desktop/DG/
├── public/                    # Static assets
│   ├── _redirects            # Netlify routing config
│   └── .htaccess             # Apache routing config
├── src/
│   ├── components/           # React components
│   │   ├── About.jsx        # About page component
│   │   ├── Cart.jsx         # Shopping cart component
│   │   ├── CategoryDetails.jsx  # Category detail view
│   │   ├── Footer.jsx       # Footer component
│   │   ├── Header.jsx       # Navigation header
│   │   ├── hero.jsx         # Hero section
│   │   ├── Login.jsx        # Authentication component
│   │   ├── Portfolio.jsx    # Portfolio showcase
│   │   ├── ProductDetailView.jsx  # Product details
│   │   ├── ProductShowCase.jsx    # Product display
│   │   ├── ProductShowCaseWrapper.jsx  # Product wrapper
│   │   └── SellCategory.jsx # Category selection
│   ├── context/             # React Context providers
│   │   └── CartContext.jsx  # Shopping cart state
│   ├── services/            # API services
│   │   └── apiService.js    # Backend API integration
│   ├── assets/              # Images and static files
│   ├── App.jsx              # Main application component
│   ├── App.css              # Application styles
│   ├── index.css            # Global styles
│   └── main.jsx             # Application entry point
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── README.md                # Project documentation
└── .gitignore               # Git ignore rules
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Beautiful notifications
- **Axios** - HTTP client for API calls

### Backend Integration
- **Spring Boot** - Java backend framework
- **Spring Security** - Authentication and authorization
- **BCrypt** - Password encryption
- **JPA/Hibernate** - Database ORM
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Git** - Version control
- **VS Code** - Recommended IDE

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Java 17+ (for backend)
- Git

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DG
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Backend Setup
Ensure your Spring Boot backend is running on `http://localhost:9090` with the following endpoints:
- `POST /api/auth/login` - User authentication
- `POST /api/auth/signup` - User registration
- `GET /api/auth/check-email/{email}` - Email availability check
- `GET /api/products` - Product listing
- `GET /api/products/category/{categoryId}` - Products by category

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:9090/api
VITE_APP_NAME=Detail Greek
```

### API Configuration
The frontend is configured to connect to the backend at `http://localhost:9090/api`. Update `src/services/apiService.js` if your backend runs on a different port.

## 📱 Features Overview

### Authentication System
- **Secure Login/Registration** with form validation
- **Real-time Email Validation** - Checks email availability during signup
- **Password Strength Validation** - Minimum 6 characters
- **Remember Me Functionality** - Saves email for convenience
- **User Session Management** - Automatic logout on token expiry

### Shopping Experience
- **Product Catalog** - Browse products by category
- **Detailed Product Views** - Comprehensive product information
- **Shopping Cart** - Add, remove, and update quantities
- **Responsive Design** - Optimized for all screen sizes
- **Loading States** - Professional loading animations

### Navigation & Routing
- **Client-side Routing** - Fast page transitions
- **View Persistence** - Maintains current page on reload
- **Smooth Scrolling** - Enhanced user experience
- **Mobile Navigation** - Collapsible mobile menu

## 🚀 Deployment

### Netlify Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. The `_redirects` file handles client-side routing

### Apache Server Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder contents to your web server
3. The `.htaccess` file handles client-side routing

### Vercel Deployment
1. Connect your Git repository to Vercel
2. Vercel automatically detects Vite configuration
3. Deploy with zero configuration

## 🔐 Security Features

- **Input Validation** - Both client and server-side
- **Password Encryption** - BCrypt with 12 rounds
- **CORS Protection** - Configured for secure API access
- **XSS Prevention** - React's built-in protection
- **Session Management** - Secure token handling

## 🐛 Troubleshooting

### Common Issues

1. **Page reloads to home on refresh**
   - Ensure `_redirects` (Netlify) or `.htaccess` (Apache) files are properly deployed

2. **API connection errors**
   - Verify backend is running on `http://localhost:9090`
   - Check CORS configuration in Spring Boot

3. **Build errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear Vite cache: `npx vite --force`

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📞 Support

For support, email [support@detailgreek.com] or create an issue in the repository.

---

**Built with ❤️ for car enthusiasts**
