import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../app.css'

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card transition-transform transform hover:scale-105 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="p-4">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <div className="product-actions">
          <button 
            onClick={() => addToCart(product)} 
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
          <Link to={`/product/${product.id}`} className="view-details-link">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
