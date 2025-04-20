// src/components/UserLogin/UserDashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import '../../components/CertificationCards';

export default function UserDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate   = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-teal-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border-t-4 border-bccaBlue">
        <h2 className="text-3xl font-extrabold text-bccaBlue mb-4 text-center">
          BCCA Dashboard
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          Welcome back! Choose an option below to get started.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleLogout}
            className="py-2 px-6 bg-bccaTeal hover:bg-green-600 text-white font-medium rounded-lg transition"
          >
            Logout
          </button>
          {/* add other dashboard actions here */}
        </div>
      </div>
    </div>
  );
}
