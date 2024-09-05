// CartContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Cart component using useContext
export const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      <ul className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
      {cartItems.length > 0 && (
        <div className="cart-actions">
          <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};
