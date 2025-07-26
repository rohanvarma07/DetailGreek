// Product data organized by categories
export const productsByCategory = {
  'ceramic-coatings': {
    title: 'Ceramic Coatings',
    description: 'Professional-grade ceramic coatings for long-lasting protection and incredible shine',
    heroImage: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1200&h=600&fit=crop',
    products: [
      {
        id: 'cc-001',
        name: '9H Ceramic Coating Kit - Professional Grade',
        price: '$299.99',
        originalPrice: '$399.99',
        image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 234,
        description: 'Ultra-durable 9H hardness ceramic coating with 5-year protection guarantee',
        features: ['5-Year Protection', '9H Hardness', 'Hydrophobic', 'UV Resistant'],
        inStock: true,
        featured: true
      },
      {
        id: 'cc-002',
        name: 'Ceramic Coating Maintenance Kit',
        price: '$79.99',
        image: 'https://images.unsplash.com/photo-1615714489284-b8b65e17c0ee?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 156,
        description: 'Complete maintenance kit for ceramic coated vehicles',
        features: ['pH Neutral', 'Coating Safe', 'Microfiber Towels', 'Detailing Spray'],
        inStock: true
      },
      {
        id: 'cc-003',
        name: 'Ceramic Coating Prep Kit',
        price: '$149.99',
        image: 'https://images.unsplash.com/photo-1605979399627-96171c2a5c85?w=400&h=400&fit=crop',
        rating: 4.8,
        reviews: 189,
        description: 'Professional surface preparation kit for ceramic coating application',
        features: ['Iron Remover', 'Clay Bar', 'Panel Prep', 'Microfiber Cloths'],
        inStock: true
      },
      {
        id: 'cc-004',
        name: 'Ceramic Coating Boost Spray',
        price: '$39.99',
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 92,
        description: 'Enhance and maintain your ceramic coating with this boost spray',
        features: ['Easy Application', 'Streak-Free', 'Adds Gloss', 'Water Repellent'],
        inStock: true
      }
    ]
  },
  'car-wash': {
    title: 'Car Wash Products',
    description: 'Premium car wash soaps, shampoos, and cleaning products for every wash type',
    heroImage: 'https://images.unsplash.com/photo-1558618047-7c80eb5656a5?w=1200&h=600&fit=crop',
    products: [
      {
        id: 'cw-001',
        name: 'pH Neutral Car Shampoo - Ceramic Safe',
        price: '$24.99',
        image: 'https://images.unsplash.com/photo-1558618047-7c80eb5656a5?w=400&h=400&fit=crop',
        rating: 4.8,
        reviews: 342,
        description: 'Gentle, pH-neutral car shampoo safe for all surfaces and coatings',
        features: ['pH Neutral', 'Coating Safe', 'High Foam', 'Streak-Free'],
        inStock: true,
        featured: true
      },
      {
        id: 'cw-002',
        name: 'Snow Foam Pre-Wash',
        price: '$34.99',
        image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 215,
        description: 'Thick snow foam for effective pre-wash cleaning',
        features: ['Thick Foam', 'Dirt Encapsulation', 'Safe Formula', 'Pleasant Scent'],
        inStock: true
      },
      {
        id: 'cw-003',
        name: 'Rinseless Wash Concentrate',
        price: '$29.99',
        image: 'https://images.unsplash.com/photo-1594736797933-d0c0a112b7d6?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 128,
        description: 'Water-saving rinseless wash solution for quick cleaning',
        features: ['Water Saving', 'Lubricious', 'Glossy Finish', 'Easy Application'],
        inStock: true
      },
      {
        id: 'cw-004',
        name: 'Wheel & Tire Cleaner',
        price: '$19.99',
        image: 'https://images.unsplash.com/photo-1570464197285-9949814674a7?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 267,
        description: 'Powerful yet safe wheel and tire cleaning solution',
        features: ['Acid-Free', 'Brake Dust Removal', 'Color Changing', 'All Wheel Safe'],
        inStock: true
      }
    ]
  },
  'cutting-polishing': {
    title: 'Cutting & Polishing',
    description: 'Professional compounds and polishing pads for paint correction and restoration',
    heroImage: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&h=600&fit=crop',
    products: [
      {
        id: 'cp-001',
        name: 'Heavy Cut Compound',
        price: '$49.99',
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop',
        rating: 4.8,
        reviews: 198,
        description: 'Professional heavy cutting compound for deep scratch removal',
        features: ['Fast Cutting', 'Minimal Dusting', 'Easy Clean Up', 'Body Shop Safe'],
        inStock: true,
        featured: true
      },
      {
        id: 'cp-002',
        name: 'Medium Polish',
        price: '$39.99',
        image: 'https://images.unsplash.com/photo-1600263388712-68687678ddef?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 156,
        description: 'Medium abrasive polish for swirl mark removal',
        features: ['Swirl Removal', 'High Gloss', 'Easy Application', 'Oil-Free Formula'],
        inStock: true
      },
      {
        id: 'cp-003',
        name: 'Finishing Polish',
        price: '$34.99',
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 223,
        description: 'Ultra-fine finishing polish for perfect paint clarity',
        features: ['Mirror Finish', 'Ultra Fine', 'No Haze', 'Perfect Clarity'],
        inStock: true
      },
      {
        id: 'cp-004',
        name: 'Polishing Pad Set',
        price: '$59.99',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 142,
        description: 'Professional grade polishing pads for all correction stages',
        features: ['3-Pad Set', 'Color Coded', 'Machine Washable', 'Durable Foam'],
        inStock: true
      }
    ]
  },
  'interior-care': {
    title: 'Interior Care',
    description: 'Complete interior detailing products for leather, fabric, and plastic surfaces',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=600&fit=crop',
    products: [
      {
        id: 'ic-001',
        name: 'Leather Conditioner & Cleaner',
        price: '$32.99',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop',
        rating: 4.8,
        reviews: 276,
        description: 'Premium leather cleaner and conditioner for all leather types',
        features: ['pH Balanced', 'UV Protection', 'Moisture Rich', 'Natural Feel'],
        inStock: true,
        featured: true
      },
      {
        id: 'ic-002',
        name: 'Fabric & Upholstery Cleaner',
        price: '$24.99',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 189,
        description: 'Deep cleaning solution for fabric and upholstery stains',
        features: ['Stain Removal', 'Odor Elimination', 'Fast Drying', 'Color Safe'],
        inStock: true
      },
      {
        id: 'ic-003',
        name: 'Dashboard & Trim Restorer',
        price: '$19.99',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 134,
        description: 'Restore and protect plastic trim and dashboard surfaces',
        features: ['Non-Greasy', 'UV Protection', 'Matte Finish', 'Anti-Static'],
        inStock: true
      },
      {
        id: 'ic-004',
        name: 'Glass Cleaner - Streak Free',
        price: '$16.99',
        image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 298,
        description: 'Professional strength glass cleaner for crystal clear results',
        features: ['Streak Free', 'Ammonia Free', 'Anti-Fog', 'Quick Drying'],
        inStock: true
      }
    ]
  },
  'paint-protection': {
    title: 'Paint Protection',
    description: 'Advanced paint protection films, sealants, and correction products',
    heroImage: 'https://images.unsplash.com/photo-1484148797386-d50dab2b9d6b?w=1200&h=600&fit=crop',
    products: [
      {
        id: 'pp-001',
        name: 'Paint Protection Film Kit',
        price: '$189.99',
        originalPrice: '$249.99',
        image: 'https://images.unsplash.com/photo-1484148797386-d50dab2b9d6b?w=400&h=400&fit=crop',
        rating: 4.8,
        reviews: 156,
        description: 'Self-healing paint protection film for high-impact areas',
        features: ['Self-Healing', 'Crystal Clear', 'Easy Install', 'Stain Resistant'],
        inStock: true,
        featured: true
      },
      {
        id: 'pp-002',
        name: 'Paint Sealant - Synthetic',
        price: '$45.99',
        image: 'https://images.unsplash.com/photo-1558583055-d7ac00b1adda?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 198,
        description: 'Long-lasting synthetic paint sealant with 12-month protection',
        features: ['12 Month Protection', 'Easy Application', 'High Gloss', 'Water Repellent'],
        inStock: true
      },
      {
        id: 'pp-003',
        name: 'Iron Remover - Paint Safe',
        price: '$28.99',
        image: 'https://images.unsplash.com/photo-1572306820532-bfa3c6b3fec8?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 234,
        description: 'Color-changing iron remover safe for all paint types',
        features: ['Color Changing', 'Paint Safe', 'Iron Removal', 'Easy Rinse'],
        inStock: true
      },
      {
        id: 'pp-004',
        name: 'Paint Correction Kit',
        price: '$89.99',
        image: 'https://images.unsplash.com/photo-1585566824840-82ad81cbdf3b?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 112,
        description: 'Complete paint correction kit for scratches and swirls',
        features: ['Complete Kit', 'Step by Step', 'Professional Results', 'Easy to Use'],
        inStock: true
      }
    ]
  },
  'polish-wax': {
    title: 'Polish & Wax',
    description: 'Premium polishes and waxes for achieving the perfect shine and protection',
    heroImage: 'https://images.unsplash.com/photo-1607194732153-39dede7c04a7?w=1200&h=600&fit=crop',
    products: [
      {
        id: 'pw-001',
        name: 'Carnauba Wax - Premium Grade',
        price: '$59.99',
        image: 'https://images.unsplash.com/photo-1607194732153-39dede7c04a7?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 289,
        description: 'Premium grade carnauba wax for deep, warm shine',
        features: ['Pure Carnauba', 'Deep Shine', 'Easy Application', 'Natural Protection'],
        inStock: true,
        featured: true
      },
      {
        id: 'pw-002',
        name: 'Quick Detailer Spray',
        price: '$22.99',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 234,
        description: 'Quick detail spray for touch-ups and maintenance',
        features: ['Quick Application', 'Safe for All Surfaces', 'Streak Free', 'Pleasant Scent'],
        inStock: true
      },
      {
        id: 'pw-003',
        name: 'Paste Wax - Traditional',
        price: '$34.99',
        image: 'https://images.unsplash.com/photo-1590031905406-f18a426d772d?w=400&h=400&fit=crop',
        rating: 4.8,
        reviews: 167,
        description: 'Traditional paste wax for hand application enthusiasts',
        features: ['Hand Application', 'Long Lasting', 'Deep Gloss', 'Easy Buffing'],
        inStock: true
      },
      {
        id: 'pw-004',
        name: 'Spray Wax - Easy Application',
        price: '$27.99',
        image: 'https://images.unsplash.com/photo-1606016467095-a8a9c66c61d6?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 145,
        description: 'Easy-to-use spray wax for quick protection and shine',
        features: ['Spray On', 'Quick Protection', 'UV Resistant', 'No Buffing Required'],
        inStock: true
      }
    ]
  },
  'pressure-washers': {
    title: 'Pressure Washers',
    description: 'Commercial-grade pressure washers and accessories for professional cleaning',
    heroImage: 'https://images.unsplash.com/photo-1599198875416-a6bf2eb0e07e?w=1200&h=600&fit=crop',
    products: [
      {
        id: 'pw-001',
        name: 'Electric Pressure Washer - 2000 PSI',
        price: '$299.99',
        originalPrice: '$399.99',
        image: 'https://images.unsplash.com/photo-1599198875416-a6bf2eb0e07e?w=400&h=400&fit=crop',
        rating: 4.8,
        reviews: 167,
        description: 'Powerful 2000 PSI electric pressure washer for home and professional use',
        features: ['2000 PSI', 'Electric Motor', '5 Nozzles Included', 'Soap Tank'],
        inStock: true,
        featured: true
      },
      {
        id: 'pw-002',
        name: 'Foam Cannon Attachment',
        price: '$79.99',
        image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 234,
        description: 'Professional foam cannon for thick, clingy snow foam',
        features: ['Adjustable Ratio', 'Thick Foam', 'Easy Fill', 'Universal Fit'],
        inStock: true
      },
      {
        id: 'pw-003',
        name: 'Surface Cleaner Attachment',
        price: '$149.99',
        image: 'https://images.unsplash.com/photo-1574269909862-7a10016ce2d0?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 123,
        description: '15-inch surface cleaner for driveways and large flat surfaces',
        features: ['15 Inch Diameter', 'Dual Nozzles', 'No Streaking', 'Quick Connect'],
        inStock: true
      },
      {
        id: 'pw-004',
        name: 'Pressure Washer Nozzle Set',
        price: '$29.99',
        image: 'https://images.unsplash.com/photo-1544880503-da54088b8a78?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 98,
        description: 'Complete set of pressure washer nozzles for all cleaning tasks',
        features: ['5 Nozzle Set', 'Color Coded', 'Quick Connect', 'Durable Construction'],
        inStock: true
      }
    ]
  },
  'tools-brushes': {
    title: 'Tools & Brushes',
    description: 'Professional detailing tools, brushes, and equipment for every detailing need',
    heroImage: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1200&h=600&fit=crop',
    products: [
      {
        id: 'tb-001',
        name: 'Microfiber Towel Set - Professional',
        price: '$39.99',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop',
        rating: 4.9,
        reviews: 456,
        description: 'Professional grade microfiber towels for all detailing tasks',
        features: ['Ultra Soft', 'Lint Free', 'Machine Washable', '12 Towel Set'],
        inStock: true,
        featured: true
      },
      {
        id: 'tb-002',
        name: 'Detailing Brush Set',
        price: '$49.99',
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
        rating: 4.8,
        reviews: 189,
        description: 'Complete set of detailing brushes for all interior and exterior cleaning',
        features: ['10 Brush Set', 'Natural Bristles', 'Ergonomic Handles', 'Various Sizes'],
        inStock: true
      },
      {
        id: 'tb-003',
        name: 'Clay Bar Kit',
        price: '$24.99',
        image: 'https://images.unsplash.com/photo-1605979399627-96171c2a5c85?w=400&h=400&fit=crop',
        rating: 4.7,
        reviews: 234,
        description: 'Professional clay bar kit for paint decontamination',
        features: ['Fine Grade Clay', 'Lubricant Included', 'Reusable', 'Easy to Use'],
        inStock: true
      },
      {
        id: 'tb-004',
        name: 'Bucket with Grit Guard',
        price: '$34.99',
        image: 'https://images.unsplash.com/photo-1574269909862-7a10016ce2d0?w=400&h=400&fit=crop',
        rating: 4.6,
        reviews: 167,
        description: 'Professional wash bucket with grit guard and measurement marks',
        features: ['20L Capacity', 'Grit Guard Included', 'Measurement Marks', 'Durable Construction'],
        inStock: true
      }
    ]
  }
};

// Category slugs for URL routing
export const categoryRoutes = {
  'ceramic-coatings': 'ceramic-coatings',
  'car-wash': 'car-wash',
  'cutting-polishing': 'cutting-polishing',
  'interior-care': 'interior-care',
  'paint-protection': 'paint-protection',
  'polish-wax': 'polish-wax',
  'pressure-washers': 'pressure-washers',
  'tools-brushes': 'tools-brushes'
};
