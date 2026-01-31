import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaPhone, FaHeart } from 'react-icons/fa';

const Emergency = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-red-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-red-600 p-4 rounded-full inline-block mb-4">
            <FaExclamationTriangle className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl font-bold text-red-800 mb-4">Emergency Blood Alert</h1>
          <p className="text-xl text-red-700">
            Critical blood shortage - Immediate donors needed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-red-600" />
                <div>
                  <p className="font-semibold">Emergency Hotline</p>
                  <p className="text-red-600 font-bold">1-800-BLOOD-911</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-blue-600" />
                <div>
                  <p className="font-semibold">Blood Bank Coordinator</p>
                  <p className="text-blue-600 font-bold">1-800-DONATE-NOW</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/requests')}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2"
              >
                <FaHeart />
                <span>I Can Donate Now</span>
              </button>
              <button 
                onClick={() => navigate('/requests')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold"
              >
                Find Nearest Blood Bank
              </button>
              <button 
                onClick={() => window.open('https://twitter.com/intent/tweet?text=Emergency%20Blood%20Alert%20-%20Donors%20needed!', '_blank')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold"
              >
                Share Emergency Alert
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Important Notice
          </h3>
          <p className="text-yellow-700">
            For life-threatening emergencies, call 911 immediately. 
            This platform is for coordinating blood donations and should not replace emergency medical services.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Emergency;