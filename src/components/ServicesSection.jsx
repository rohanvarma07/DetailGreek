import wash from '../assets/wash.jpg';
import polish from '../assets/ceramic.jpg';
import paint from '../assets/paint.png';
import interior from '../assets/interior.jpg';
import wheel from '../assets/wheelalign.jpg';

const ServiceCard = ({ image, title, alt, description }) => {
  return (
    <div className="group relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-400/50 transition-all duration-300 hover-lift">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {description}
        </p>
      </div>
      
      {/* Simplified hover overlay */}
      <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    { 
      image: wash, 
      title: "Premium Wash", 
      alt: "Car Wash",
      description: "Complete exterior and interior cleaning with premium products"
    },
    { 
      image: polish, 
      title: "Ceramic Coating", 
      alt: "Ceramic Polish",
      description: "Long-lasting protection with superior shine and durability"
    },
    { 
      image: paint, 
      title: "Paint Correction", 
      alt: "Paint Protection",
      description: "Remove swirls and scratches for a flawless finish"
    },
    { 
      image: interior, 
      title: "Interior Detailing", 
      alt: "Interior Detailing",
      description: "Deep cleaning and protection for your vehicle's interior"
    },
    { 
      image: wheel, 
      title: "Wheel Care", 
      alt: "Wheel Alignment",
      description: "Complete wheel cleaning, polishing, and protection"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional car detailing services using premium products and techniques to restore and protect your vehicle
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              image={service.image}
              title={service.title}
              alt={service.alt}
              description={service.description}
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-lg rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/25">
            Book Your Service Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
