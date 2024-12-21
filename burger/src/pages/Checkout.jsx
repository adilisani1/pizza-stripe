import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderStatus from '../components/OrderStatus';
const Checkout = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const [orderId, setOrderId] = useState(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      alert("You need to log in first.");
      navigate("/login");
    }
  }, [token, navigate]);

  const userId = localStorage.getItem('userId');
  const loggedInEmail = localStorage.getItem('email');
  const googleEmail = localStorage.getItem('googleEmail');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email !== loggedInEmail && formData.email !== googleEmail) {
      alert("Your email does not match your logged-in details.");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
      alert("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (formData.phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    const order = {
      customer: formData,
      items: cartItems,
      totalPrice: calculateTotalPrice(),
      userId,
    };

    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(order),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Order placed successfully:', data);
        if (data.order && data.order._id) {
          alert('Order placed successfully!');
          setOrderId(data.order._id);
          localStorage.removeItem('cartItems');
          setCartItems([]);
          navigate(`/order-status/${data.order._id}`); 
        } else {
          throw new Error("Failed to retrieve order ID");
        }
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again.');
      });
  };

  return (
    <div className="flex w-full">
      <div className="flex-[3] flex-col w-full">
        <h1 className="text-3xl">Billing Information</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="name">Username</label>
          <input
            className="mb-4 w-2/3 h-10 border border-gray-300"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            className="mb-4 w-2/3 h-10 border border-gray-300"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="phone">Phone</label>
          <input
            className="mb-4 w-2/3 h-10 border border-gray-300"
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <label htmlFor="address">Address</label>
          <input
            className="mb-4 w-2/3 h-10 border border-gray-300"
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <label htmlFor="city">City</label>
          <input
            className="w-2/3 h-10 border border-gray-300"
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <div className="mt-4 flex">
            <button className="w-1/2 rounded-md h-12 bg-orange-600 text-white" type="submit">
              Pay Now
            </button>
          </div>
        </form>
      </div>

      <div className="flex-[2] p-10 rounded-md bg-gray-200 w-full">
        <h1 className="text-2xl mb-3 font-bold">Order Summary</h1>
        {cartItems.length === 0 ? (
          <p>No items in your cart</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="mb-2">
                <p>{item.name} - {item.quantity} x ${item.price}</p>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-lg font-semibold">Total: ${calculateTotalPrice()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
