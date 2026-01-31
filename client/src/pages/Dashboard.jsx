import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaTint, FaHospital, FaUsers, FaCalendar, FaBell } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { icon: FaHeart, label: 'Lives Saved', value: '24', color: 'bg-red-500' },
    { icon: FaTint, label: 'Blood Donated', value: '3.2L', color: 'bg-blue-500' },
    { icon: FaUsers, label: 'Active Donors', value: '1,247', color: 'bg-green-500' },
    { icon: FaHospital, label: 'Partner Hospitals', value: '89', color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">
            {user?.role === 'donor' 
              ? 'Ready to save lives today?' 
              : user?.role === 'hospital'
              ? 'Manage your blood requests and inventory'
              : user?.role === 'bloodbank'
              ? 'Coordinate blood collection and distribution'
              : 'Welcome to BloodLink'
            }
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="text-white text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <FaHeart className="text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Blood donation completed</p>
                    <p className="text-sm text-gray-600">City Hospital • 2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/requests')}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                {user?.role === 'donor' ? 'Find Blood Requests' : 'Create Blood Request'}
              </button>
              {(user?.role === 'hospital' || user?.role === 'bloodbank') && (
                <>
                  <button 
                    onClick={() => navigate('/donor-management')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    View All Donors
                  </button>
                  <button 
                    onClick={() => navigate('/request-responses')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Manage Responses
                  </button>
                </>
              )}
              <button 
                onClick={() => navigate('/profile')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                View Profile
              </button>
              <button 
                onClick={() => navigate('/emergency')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Emergency Alert
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;