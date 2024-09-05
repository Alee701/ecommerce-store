// Header.jsx
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../app.css'

const Header = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useContext(CartContext);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const cartItemCount = cartItems.length;

  return (
    <nav className="header-container bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="logo text-white text-2xl font-extrabold">
          E-commerce Store
        </Link>
        <div className="search-bar relative w-1/3">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleInputChange}
            className="search-input p-2 w-full rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="cart-section text-white">
          <Link to="/cart" className="cart-link flex items-center ml-4 text-lg">
            <svg
              className="cart-icon w-6 h-6 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L7 21h10l1-6m-6-8V5a2 2 0 104 0v1m-8 0V5a2 2 0 114 0v1m4 16h-8"
              ></path>
            </svg>
            Cart ({cartItemCount})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
