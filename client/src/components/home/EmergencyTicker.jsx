import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaClock, FaMapMarkerAlt, FaTint } from 'react-icons/fa';
import { bloodRequestAPI } from '../../services/api';

const EmergencyTicker = () => {
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmergencyRequests();
    // Refresh every 30 seconds
    const interval = setInterval(fetchEmergencyRequests, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchEmergencyRequests = async () => {
    try {
      const response = await bloodRequestAPI.getEmergencyRequests();
      setEmergencyRequests(response.data);
    } catch (error) {
      console.error('Error fetching emergency requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const requestTime = new Date(date);
    const diffInMinutes = Math.floor((now - requestTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  if (loading) {
    return (
      <section className="py-8 bg-red-50 border-y border-red-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
            <span className="ml-2 text-red-700">Loading emergency requests...</span>
          </div>
        </div>
      </section>
    );
  }

  if (emergencyRequests.length === 0) {
    return (
      <section className="py-8 bg-green-50 border-y border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-700 font-medium">No active emergency requests</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-red-50 border-y border-red-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center space-x-2"
          >
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <h3 className="text-lg font-bold text-red-800">LIVE EMERGENCY REQUESTS</h3>
            <FaExclamationTriangle className="text-red-600 text-xl" />
          </motion.div>
        </div>

        {/* Scrolling Ticker */}
        <div className="relative">
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="flex space-x-8 whitespace-nowrap"
          >
            {emergencyRequests.map((request, index) => (
              <div
                key={`${request._id}-${index}`}
                className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-sm border border-red-200 min-w-max"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-red-800">URGENT</span>
                </div>
                
                <div className="flex items-center space-x-1 text-red-700">
                  <FaTint />
                  <span className="font-bold">{request.bloodGroup}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-700">
                  <FaMapMarkerAlt />
                  <span>{request.location?.city || 'Location not specified'}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-600">
                  <FaClock />
                  <span>{getTimeAgo(request.createdAt)}</span>
                </div>
                
                <div className="text-gray-700">
                  <span className="font-medium">{request.unitsNeeded} units needed</span>
                </div>
                
                <div className="text-gray-600">
                  <span>at {request.hospitalName}</span>
                </div>
              </div>
            ))}
            
            {/* Duplicate for seamless loop */}
            {emergencyRequests.map((request, index) => (
              <div
                key={`duplicate-${request._id}-${index}`}
                className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-sm border border-red-200 min-w-max"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-red-800">URGENT</span>
                </div>
                
                <div className="flex items-center space-x-1 text-red-700">
                  <FaTint />
                  <span className="font-bold">{request.bloodGroup}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-700">
                  <FaMapMarkerAlt />
                  <span>{request.location?.city || 'Location not specified'}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-600">
                  <FaClock />
                  <span>{getTimeAgo(request.createdAt)}</span>
                </div>
                
                <div className="text-gray-700">
                  <span className="font-medium">{request.unitsNeeded} units needed</span>
                </div>
                
                <div className="text-gray-600">
                  <span>at {request.hospitalName}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-6">
          <p className="text-red-700 text-sm mb-3">
            These patients need your help immediately. Every minute counts.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 animate-pulse"
            onClick={() => window.location.href = '/requests?urgency=emergency'}
          >
            Respond to Emergency
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default EmergencyTicker;