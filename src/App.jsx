import { useState } from 'react';
import './App.css';
import cartIcon from './assets/shopping-cart.png';
import img from './assets/DG.png';
import detail from './assets/detail.png';
import wash from './assets/wash.jpg';
import polish from './assets/ceramic.jpg';
import paint from './assets/paint.png';
import interior from './assets/interior.jpg';
import wheel from './assets/wheelalign.jpg';
import ceramic from './assets/ceramic.png';
import carwash from './assets/car-wash.png';
import compound from './assets/compound.png';
import pressure from './assets/pressure.png';
import brush from './assets/brush.png';

function App() {
  const [count, setCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="nav-bar">
        <div className="nav-left">
          <img src={img} className="logo" alt="Logo" />
          <p className="title">DetailGreek</p>
        </div>
        
        <div className='content'>
          <p className="nav">Home</p>
          <p className="nav">About</p>
          <p className="nav">Contact</p>
        </div>
        
        <div className="nav-right">
          <img src={cartIcon} className="cart" alt="Cart"/>
          <button className='login'>Login</button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <p className="nav" onClick={() => setIsMobileMenuOpen(false)}>Home</p>
        <p className="nav" onClick={() => setIsMobileMenuOpen(false)}>About</p>
        <p className="nav" onClick={() => setIsMobileMenuOpen(false)}>Contact</p>
        <img src={cartIcon} className="cart" alt="Cart"/>
        <button className='login' onClick={() => setIsMobileMenuOpen(false)}>Login</button>
      </div>
      <div className='banner1'>
        <h1 className='banner-text'>Welcome to DetailGreek</h1>
        {/* <video src={video} autoPlay muted loop playsInline className='video-banner'/> */}
        <p className='banner-subtext'>Your one-stop solution for all car detailing needs</p>
      </div>
      <div className="component-details">
  <p className="component-title">OUR SERVICES</p>

  <div className="scroll-container">
    <button className="scroll-button left" onClick={() => {
      document.querySelector('.banner-cards').scrollBy({ left: -300, behavior: 'smooth' });
    }}>
      &#8249;
    </button>

    <div className="banner-cards">
      <div className="card">
        <img src={wash} alt="Car Wash" className="card-image" />
        <p className="card-title">Car Wash</p>
      </div>
      <div className="card">
        <img src={polish} alt="Ceramic Polish" className="card-image" />
        <p className="card-title1">Ceramic Coat</p>
      </div>
      <div className="card">
        <img src={paint} alt="Paint Protection" className="card-image" />
        <p className="card-title1">Paint Protection</p>
      </div>
      <div className="card">
        <img src={interior} alt="Interior Detailing" className="card-image" />
        <p className="card-title1">Interior Detailing</p>
      </div>
      <div className="card">
        <img src={wheel} alt="Wheel Alignment" className="card-image" />
        <p className="card-title1">Wheel Alignment</p>
      </div>
    </div>

    <button className="scroll-button right" onClick={() => {
      document.querySelector('.banner-cards').scrollBy({ left: 300, behavior: 'smooth' });
    }}>
      &#8250;
    </button>
  </div>

  <div className="container2">
    <div className="product-details">
      <p className="product-title">NEW PRODUCTS & BEST SELLER</p>
      
      <div className="scroll-container">
        <button className="scroll-button left" onClick={() => {
          document.querySelector('.product-lists').scrollBy({ left: -300, behavior: 'smooth' });
        }}>
          &#8249;
        </button>

        <div className="product-lists">
          <div className="product-card">
            <img src='https://www.carsupplieswarehouse.com/cdn/shop/files/Red_Sprayer.webp?v=1752249896&width=550' alt="Product 1" className="product-image" />
            <p className="product-name">Koch Chemie AcidBlaster 360 – 1.5L Pressure Sprayer for Acidic & Neutral Products</p>
            <p className="product-price">Rs. 4,400.00</p>
          </div>
          <div className="product-card">
            <img src='https://www.carsupplieswarehouse.com/cdn/shop/files/9998283__1752203189.png?v=1752248291&width=550' alt="Product 2" className="product-image" />
            <p className="product-name">Koch Chemie AlkaSpray 360 – 1.5L Pressure Sprayer for Alkaline Products</p>
            <p className="product-price">Rs. 4,400.00</p>
          </div>
          <div className="product-card">
            <img src='https://www.carsupplieswarehouse.com/cdn/shop/files/hp90-frontright_web.webp?v=1752091463&width=550' alt="Product 3" className="product-image" />
            <p className="product-name">Mytee Stingray™ HP90 Heated Detail Extractor</p>
            <p className="product-price">Rs. 135,700.00</p>
          </div>
          <div className="product-card">
            <img src='https://www.carsupplieswarehouse.com/cdn/shop/files/ReleasePint.webp?v=1751398467&width=550' alt="Product 4" className="product-image" />
            <p className="product-name">P&S RELEASE Vacuum Aid – Interior Vacuuming Made Effortless</p>
            <p className="product-price">Rs. 400.00</p>
          </div>
          <div className="product-card">
            <img src='https://www.carsupplieswarehouse.com/cdn/shop/files/Screenshot2025-06-26at8.57.49AM.png?v=1750947135&width=360' alt="Product 5" className="product-image" />
            <p className="product-name">AR630(black) Pro Electric Pressure Washer – Commercial-Grade Performance for Detailers & Professionals</p>
            <p className="product-price">Rs. 85,000.00</p>
          </div>
          <div className="product-card">
            <img src='https://www.carsupplieswarehouse.com/cdn/shop/files/Premium-Glass-16x16-Blue-main-252case-web.webp?v=1750798216&width=550' alt="Product 6" className="product-image" />
            <p className="product-name">THE RAG COMPANY Premium GLASS and WINDOW Towel (5 Pack)- BLUE 16x24</p>
            <p className="product-price">Rs. 1,800.00</p>
          </div>
          <div className="product-card">
            <img src='https://www.carsupplieswarehouse.com/cdn/shop/files/Gtechniq_29.01.254920-scaled-1_1.jpg?v=1750520066&width=550' alt="Product 7" className="product-image" />
            <p className="product-name">Gtechniq PPF & Vinyl Maintenance Kit – Full-Care System for Film & Wrap Protection</p>
            <p className="product-price">Rs. 7,500.00</p>
          </div>
        </div>

        <button className="scroll-button right" onClick={() => {
          document.querySelector('.product-lists').scrollBy({ left: 300, behavior: 'smooth' });
        }}>
          &#8250;
        </button>
      </div>
    </div>
  </div>

  <div className="container3">
    <div className="category">
      <div className="category-details">
        <p className='category-title'>WE OFFER PRODUCTS</p>
        <div className="category-container">
        <div className="category-card">
          <img src={ceramic} alt="Ceramic Polish" className="category-image" />
          <p className="category-name">CERAMIC COATINGS</p>
        </div>
        <div className="category-card">
          <img src={carwash} alt="Car Wash" className="category-image" />
          <p className="category-name">CAR WASH SUPPLY & PRODUCTS</p>
        </div>
        <div className="category-card">
          <img src={compound} alt="Compound" className="category-image" />
          <p className="category-name">CUTTING PADS & COMPOUNDS</p>
        </div>
        <div className="category-card">
          <img src={interior} alt="Interior Detailing" className="category-image" />
          <p className="category-name">INTERIOR DETAILING PRODUCTS</p>
        </div>
        <div className="category-card">
          <img src={pressure} alt="Pressure Washers" className="category-image" />
          <p className="category-name">PRESSURE WASHERS</p>
        </div>
        <div className="category-card">
          <img src ={brush} alt="Brushes" className="category-image" />
          <p className="category-name">BRUSHES & TOOLS</p>
        </div> 
      </div>
      </div>
    </div>
  </div>

</div>
    </>
  );
}

export default App;
