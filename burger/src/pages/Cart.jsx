import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  
  const handleRemoveFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleCheckOut = () => {
    navigate('/checkout');
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <div>
        {cartItems.length === 0 ? (
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
        ) : (
          <h2 className="text-xl font-semibold">Your Cart</h2>
        )}
      </div>

      {cartItems.map((item) => (
        <div key={item._id} className="flex gap-11 mb-4">
          <h3>{item.name}</h3>
          <div>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
          <div>
            <button
              className="px-6 rounded-md h-12 hover:bg-purple-700 bg-purple-600 text-white"
              onClick={() => handleRemoveFromCart(item._id)}
            >
              Remove from Cart
            </button>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <>
          <div className="mt-4">
            <p className="text-lg">Total: ${calculateTotalPrice()}</p>
          </div>
          <div className="mt-4 flex">
            <button
              className="w-1/2 rounded-md h-12 hover:bg-orange-700 bg-orange-600 text-white"
              onClick={handleCheckOut}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
