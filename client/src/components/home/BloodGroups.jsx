import React from 'react';
import { motion } from 'framer-motion';
import { FaTint, FaUsers, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const BloodGroups = () => {
  const navigate = useNavigate();

  const handleFindDonors = (bloodType) => {
    toast.success(`Searching for ${bloodType} donors in your area...`);
    navigate('/requests');
  };
  const bloodGroups = [
    { type: 'O+', compatibility: 'Universal Plasma Donor', donors: 1250, color: 'bg-red-500' },
    { type: 'O-', compatibility: 'Universal Blood Donor', donors: 890, color: 'bg-red-600' },
    { type: 'A+', compatibility: 'Can donate to A+, AB+', donors: 1100, color: 'bg-blue-500' },
    { type: 'A-', compatibility: 'Can donate to A+, A-, AB+, AB-', donors: 650, color: 'bg-blue-600' },
    { type: 'B+', compatibility: 'Can donate to B+, AB+', donors: 980, color: 'bg-green-500' },
    { type: 'B-', compatibility: 'Can donate to B+, B-, AB+, AB-', donors: 420, color: 'bg-green-600' },
    { type: 'AB+', compatibility: 'Universal Plasma Recipient', donors: 320, color: 'bg-purple-500' },
    { type: 'AB-', compatibility: 'Can donate to AB+, AB-', donors: 180, color: 'bg-purple-600' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Available Blood Groups
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find donors by blood type. Each blood group has specific compatibility 
            requirements for safe transfusions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloodGroups.map((group, index) => (
            <motion.div
              key={group.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="card hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Blood Type Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`${group.color} p-3 rounded-lg`}>
                  <FaTint className="text-white text-2xl" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{group.type}</div>
                  <div className="text-sm text-gray-500">Blood Type</div>
                </div>
              </div>

              {/* Compatibility Info */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {group.compatibility}
                </p>
              </div>

              {/* Donor Count */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-gray-400" />
                  <span className="text-sm text-gray-600">Available Donors</span>
                </div>
                <span className="font-semibold text-gray-900">{group.donors.toLocaleString()}</span>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleFindDonors(group.type)}
                className="w-full bg-gray-100 hover:bg-primary-600 hover:text-white text-gray-700 py-2 px-4 rounded-lg font-medium transition-all duration-200 group-hover:bg-primary-600 group-hover:text-white flex items-center justify-center space-x-2"
              >
                <FaHeart className="text-sm" />
                <span>Find Donors</span>
              </button>

              {/* Availability Indicator */}
              <div className="mt-3 flex items-center justify-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  group.donors > 800 ? 'bg-green-500' : 
                  group.donors > 400 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-xs text-gray-500">
                  {group.donors > 800 ? 'High Availability' : 
                   group.donors > 400 ? 'Moderate Availability' : 'Low Availability'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blood Compatibility Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-card p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Blood Compatibility Guide
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <FaTint className="text-red-500" />
                <span>Universal Donors</span>
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>O-</strong> - Can donate to all blood types</li>
                <li>• <strong>O+</strong> - Can donate plasma to all types</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <FaHeart className="text-blue-500" />
                <span>Universal Recipients</span>
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>AB+</strong> - Can receive from all blood types</li>
                <li>• <strong>AB-</strong> - Can receive plasma from all types</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Always consult with medical professionals for blood transfusion decisions. 
              This information is for educational purposes only.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BloodGroups;