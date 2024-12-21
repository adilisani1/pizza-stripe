import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { postApi } from '../constant/fetchApi';  
import OAuth from './OAuth';
const Register = () => {

  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await postApi('signup', user);  

      if (!response) {
        throw new Error('Registration failed');
      }
    
      console.log('Registration Successful:', response);
      navigate('/login');
    } catch (error) {
      console.log('Error posting data: ' + error.message);
      setError(error.message);  
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold py-10 text-center">Register</h1>
      <div className="flex justify-center ">
        <div className="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4 w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div className="flex justify-center gap-4">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
              <OAuth />
            </div>

            <div className="flex justify-center mt-3">
              <p className="text-gray-600 text-lg hover:text-gray-900 underline text-right mt-0.5">
                Already have an account? <NavLink className="text-blue-500 underline hover:text-blue-800" to="/login">Login</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
