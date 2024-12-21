import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Pizzas from "./pages/Pizzas";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Footer from './components/Footer';
import PizzaDetails from "./components/PizzaDetails";
import Login from './components/Login';
import { useEffect, useState } from "react";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import OrderStatusPage from "./components/OrderStatus";
import Profile from "./pages/Profile";
function App() {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen"> 
        <Navbar />
        <div className="flex-grow  max-h-screen"> 
          <Routes>
            <Route path="/" element={<Pizzas />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route element={<PrivateRoute />}>
              <Route path="/:id" element={<PizzaDetails cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route path="/order-status/:orderId" element={<OrderStatusPage />} />
              <Route path="/profile" element={<Profile/>} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
