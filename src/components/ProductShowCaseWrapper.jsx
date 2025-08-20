import React, { useState } from "react";
import ProductShowCase from "./ProductShowCase";
import ProductDetailView from "./ProductDetailView";
import { useCart } from "../context/CartContext";

const ProductShowCaseWrapper = () => {
    const [currentView, setCurrentView] = useState('showcase');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useCart();

    const handleProductView = (product) => {
        setSelectedProduct(product);
        setCurrentView('detail');
    };

    const handleBackToProducts = () => {
        setCurrentView('showcase');
        setSelectedProduct(null);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    // Render based on current view
    if (currentView === 'detail' && selectedProduct) {
        return (
            <ProductDetailView 
                product={selectedProduct} 
                onBack={handleBackToProducts}
                onAddToCart={handleAddToCart}
            />
        );
    }

    // Default to showcase view
    return (
        <ProductShowCase onProductView={handleProductView} />
    );
};

export default ProductShowCaseWrapper;
