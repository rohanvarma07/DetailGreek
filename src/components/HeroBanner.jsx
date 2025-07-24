const HeroBanner = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[url('./assets/ceramic.jpg')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      
      {/* Optimized background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-8">
          {/* Main heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
            <span className="block text-white mb-2">Premium</span>
            <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-blue-400 bg-clip-text text-transparent">
              Car Detailing
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your vehicle with our professional detailing services. 
            From ceramic coating to paint correction, we deliver excellence in every detail.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-lg rounded-full hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/25">
              <span className="relative z-10">Book Now</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-full hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 backdrop-blur-sm">
              <span className="flex items-center space-x-2">
                <span>View Services</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">500+</div>
              <div className="text-sm text-gray-400 mt-1">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">5★</div>
              <div className="text-sm text-gray-400 mt-1">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400">10+</div>
              <div className="text-sm text-gray-400 mt-1">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Optimized scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group hover:border-yellow-400/50 transition-colors duration-300">
          <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 group-hover:animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
