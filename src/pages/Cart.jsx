import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between items-center">
                <div>{item.title}</div>
                <div>${item.price}</div>
                <button onClick={() => removeFromCart(item.id)} className="p-2 bg-red-500 text-white rounded">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <button onClick={clearCart} className="p-2 bg-red-500 text-white rounded mt-4">
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
