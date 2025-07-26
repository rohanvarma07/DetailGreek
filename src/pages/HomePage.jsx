import HeroBanner from '../components/HeroBanner';
import ServicesSection from '../components/ServicesSection';
import ProductsSection from '../components/ProductsSection';
import CategoriesSection from '../components/CategoriesSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <ServicesSection />
      <ProductsSection />
      <CategoriesSection />
      <Footer />
    </>
  );
};

export default HomePage;
