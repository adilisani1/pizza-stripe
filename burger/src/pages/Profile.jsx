import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant/fetchApi';

const Profile = () => {
  const navigate = useNavigate();

  const { token, userId } = {
    token: localStorage.getItem('access_token'),
    userId: localStorage.getItem('userId'),
  };

  const handleDelete = async () => {
    try {
      const confirm = window.confirm("Are you sure you want to delete your account?");
      if (!confirm) return;

      await axios.delete(`${BASE_URL}/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Account deleted successfully!');
      localStorage.clear();
      navigate('/register'); 
    } catch (error) {
      console.error('Error deleting user:', error.message);
      alert('Error deleting account. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>
      <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl mb-4">Delete Account</h2>
        <p className="text-gray-600 mb-6">
          Once your account is deleted, all your data will be permanently removed. This action
          cannot be undone.
        </p>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
