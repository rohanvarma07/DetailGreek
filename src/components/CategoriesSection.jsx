import { useNavigate } from 'react-router-dom';
import ceramic from '../assets/ceramic.png';
import compound from '../assets/compound.png';
import interior from '../assets/interior.jpg';
import pressure from '../assets/pressure.png';
import brush from '../assets/brush.png';
import paint from '../assets/paint.png';
import polish from '../assets/polish.png';
import wash from '../assets/wash.jpg';

const CategoryCard = ({ image, title, alt, description, slug }) => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate(`/category/${slug}`);
  };

  return (
    <div className="group bg-black/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-400/50 transition-all duration-300 hover-lift cursor-pointer">
      <div className="p-6 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400/20 to-blue-400/20 rounded-full flex items-center justify-center group-hover:from-yellow-400/30 group-hover:to-blue-400/30 transition-all duration-200">
          <img 
            src={image} 
            alt={alt} 
            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-200" 
            style={{ 
              filter: image.includes('.png') ? 'brightness(0) invert(1)' : 'none',
              mixBlendMode: image.includes('.png') ? 'normal' : 'luminosity'
            }}
          />
        </div>
        
        <h3 className="text-white font-bold text-lg mb-3 group-hover:text-yellow-400 transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
        
        <button 
          onClick={handleExploreClick}
          className="px-6 py-2 bg-transparent border border-white/30 text-white rounded-full hover:border-yellow-400 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all duration-200 text-sm font-medium transform hover:scale-105"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  const categories = [
    { 
      image: ceramic, 
      title: "Ceramic Coatings", 
      alt: "Ceramic Coating",
      description: "Professional-grade ceramic coatings for long-lasting protection and incredible shine",
      slug: "ceramic-coatings"
    },
    { 
      image: wash, 
      title: "Car Wash Products", 
      alt: "Car Wash Services",
      description: "Premium car wash soaps, shampoos, and cleaning products for every wash type",
      slug: "car-wash"
    },
    { 
      image: compound, 
      title: "Cutting & Polishing", 
      alt: "Polishing Compound",
      description: "Professional compounds and polishing pads for paint correction and restoration",
      slug: "cutting-polishing"
    },
    { 
      image: interior, 
      title: "Interior Care", 
      alt: "Interior Detailing",
      description: "Complete interior detailing products for leather, fabric, and plastic surfaces",
      slug: "interior-care"
    },
    { 
      image: paint, 
      title: "Paint Protection", 
      alt: "Paint Care",
      description: "Advanced paint protection films, sealants, and correction products",
      slug: "paint-protection"
    },
    { 
      image: polish, 
      title: "Polish & Wax", 
      alt: "Car Polish",
      description: "Premium polishes and waxes for achieving the perfect shine and protection",
      slug: "polish-wax"
    },
    { 
      image: pressure, 
      title: "Pressure Washers", 
      alt: "Pressure Washing Equipment",
      description: "Commercial-grade pressure washers and accessories for professional cleaning",
      slug: "pressure-washers"
    },
    { 
      image: brush, 
      title: "Tools & Brushes", 
      alt: "Detailing Tools",
      description: "Professional detailing tools, brushes, and equipment for every detailing need",
      slug: "tools-brushes"
    }
  ];

  return (
    <section id="categories" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Product <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our comprehensive range of professional car detailing products and equipment
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              image={category.image}
              title={category.title}
              alt={category.alt}
              description={category.description}
              slug={category.slug}
            />
          ))}
        </div>
        
        {/* Contact CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-yellow-400/10 to-blue-400/10 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Custom Solutions?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Contact our experts for personalized product recommendations and professional detailing solutions tailored to your specific needs.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-lg rounded-full hover:from-yellow-500 hover:to-yellow-600 hover-lift transition-all duration-200 shadow-2xl hover:shadow-yellow-400/25">
            Contact Our Experts
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
