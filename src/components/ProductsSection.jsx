const ProductCard = ({ image, title, price, alt, category }) => {
  return (
    <div className="group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-400/50 transition-all duration-300 hover-lift">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={image} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-yellow-400/90 text-black text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-yellow-400 font-bold text-lg">{price}</span>
          <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-medium text-sm rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const products = [
    {
      image: 'https://images.unsplash.com/photo-1558618047-7c80eb5656a5?w=400&h=400&fit=crop',
      title: 'Premium Car Wax - Long Lasting Protection',
      price: '$49.99',
      category: 'Wax',
      alt: 'Premium Car Wax'
    },
    {
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop',
      title: 'Ceramic Coating Kit - Professional Grade',
      price: '$159.99',
      category: 'Coating',
      alt: 'Ceramic Coating'
    },
    {
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop',
      title: 'Microfiber Towel Set - Ultra Soft',
      price: '$29.99',
      category: 'Accessories',
      alt: 'Microfiber Towels'
    },
    {
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop',
      title: 'Paint Correction Polish - Swirl Remover',
      price: '$79.99',
      category: 'Polish',
      alt: 'Paint Polish'
    },
    {
      image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=400&fit=crop',
      title: 'Interior Cleaner Spray - All Surfaces',
      price: '$24.99',
      category: 'Cleaner',
      alt: 'Interior Cleaner'
    },
    {
      image: 'https://images.unsplash.com/photo-1570464197285-9949814674a7?w=400&h=400&fit=crop',
      title: 'Tire Shine Gel - Long Lasting Gloss',
      price: '$19.99',
      category: 'Tire Care',
      alt: 'Tire Shine'
    }
  ];

  const categories = ['All', 'Wax', 'Coating', 'Polish', 'Cleaner', 'Accessories', 'Tire Care'];

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Premium <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional-grade car care products trusted by detailing experts worldwide
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-6 py-2 border border-white/20 text-white rounded-full hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 first:bg-yellow-400 first:text-black first:border-yellow-400"
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard 
              key={index}
              image={product.image}
              title={product.title}
              price={product.price}
              category={product.category}
              alt={product.alt}
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-lg rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/25">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};
export default ProductsSection;
