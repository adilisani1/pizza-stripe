import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import axios from 'axios';  
import { BASE_URL } from '../constant/fetchApi';  
import OAuth from './OAuth';

const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/signin`, { email, password }, { withCredentials: true });
      const { userId, token, } = response.data;
      localStorage.setItem('access_token', token);
      localStorage.setItem("email", response.data.email);     
      localStorage.setItem("profilePicture", response.data.profilePicture);
      localStorage.setItem('userId', userId);

      navigate('/'); 

    } catch (error) {
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        setError(error.response?.data?.message || 'Something went wrong on the server.');
      } else if (error.request) {
        setError('No response from the server. Please check your internet connection or try again later.');
      } else {
        console.error("Error setting up the request:", error.message);
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold py-10 text-center">Login</h1>
      <div className="flex justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <div className="flex justify-center gap-4">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={loading} // Disable button if loading
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <OAuth/>
            </div>

            <div className="flex justify-center mt-3">
              <p className="text-gray-600 text-lg hover:text-gray-900 underline text-right mt-0.5">
                Don't have an account? <NavLink className="text-blue-500 underline hover:text-blue-800" to="/register">Register</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
