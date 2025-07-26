import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsByCategory } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      image: product.image,
      title: product.name,
      price: product.price,
      category: product.category
    });
  };

  return (
    <div 
      className="group bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-400/30 transition-all duration-500 hover:bg-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
        />
        
        {/* Minimal badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.featured && (
            <span className="px-2 py-1 bg-yellow-400 text-black text-xs font-medium rounded-lg backdrop-blur-sm">
              Featured
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2 py-1 bg-red-500/90 text-white text-xs font-medium rounded-lg backdrop-blur-sm">
              Sale
            </span>
          )}
        </div>

        {/* Minimal rating */}
        <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-md rounded-lg px-2 py-1">
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white text-xs font-medium">{product.rating}</span>
          </div>
        </div>

        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4">
            <button className="w-full py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium rounded-xl hover:bg-white/30 transition-all duration-300">
              Quick View
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-white font-medium mb-2 text-sm leading-relaxed group-hover:text-yellow-400 transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Simple price display */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400 font-semibold text-lg">{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-500 text-sm line-through">{product.originalPrice}</span>
            )}
          </div>
          {product.reviews && (
            <span className="text-gray-400 text-xs">({product.reviews} reviews)</span>
          )}
        </div>

        {/* Minimal add to cart button */}
        <button 
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2.5 font-medium text-sm rounded-xl transition-all duration-300 ${
            product.inStock 
              ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg hover:shadow-yellow-400/25'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
  
  const categoryData = productsByCategory[categorySlug];

  useEffect(() => {
    if (!categoryData) {
      navigate('/');
    }
  }, [categoryData, navigate]);

  if (!categoryData) {
    return null;
  }

  // Sort and filter products
  let filteredProducts = [...categoryData.products];

  // Apply filters
  if (filterBy === 'in-stock') {
    filteredProducts = filteredProducts.filter(product => product.inStock);
  } else if (filterBy === 'featured') {
    filteredProducts = filteredProducts.filter(product => product.featured);
  } else if (filterBy === 'sale') {
    filteredProducts = filteredProducts.filter(product => product.originalPrice);
  }

  // Apply sorting
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'price-high':
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Minimal Hero Section */}
      <div className="relative h-48 md:h-64 overflow-hidden pt-20 md:pt-24">
        <img 
          src={categoryData.heroImage} 
          alt={categoryData.title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        <div className="absolute inset-0 flex items-center justify-center pt-20 md:pt-24">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center text-yellow-400/80 hover:text-yellow-400 mb-6 text-sm font-medium transition-colors duration-300"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
            <h1 className="text-3xl md:text-5xl font-light text-white mb-3 tracking-wide">
              {categoryData.title}
            </h1>
            <p className="text-gray-300 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              {categoryData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Minimal Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Clean Filters and Sorting */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 space-y-6 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-3">
              <span className="text-white/80 font-light text-sm">Filter</span>
              <select 
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:border-yellow-400/50 transition-all duration-300 backdrop-blur-md"
              >
                <option value="all">All Products</option>
                <option value="featured">Featured</option>
                <option value="in-stock">In Stock</option>
                <option value="sale">On Sale</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-white/80 font-light text-sm">Sort</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:border-yellow-400/50 transition-all duration-300 backdrop-blur-md"
              >
                <option value="featured">Featured</option>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="text-gray-400 text-sm font-light">
            {filteredProducts.length} of {categoryData.products.length} products
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-6 bg-white/5 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-white/80 text-lg font-light mb-2">No products found</h3>
            <p className="text-gray-400 text-sm font-light mb-6">Try adjusting your filters to see more results</p>
            <button 
              onClick={() => setFilterBy('all')}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-yellow-400/50 text-white rounded-xl transition-all duration-300 backdrop-blur-md text-sm font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Minimal Load More Button */}
        {filteredProducts.length >= 8 && (
          <div className="text-center mt-16">
            <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-medium rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
