import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { FaTint, FaPhone, FaMapMarkerAlt, FaCalendar, FaUser, FaWeight, FaBirthdayCake } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DonorManagement = () => {
  const { user } = useAuth();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, available, unavailable

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await authAPI.getAllDonors();
      setDonors(response.data);
    } catch (error) {
      toast.error('Failed to fetch donors');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredDonors = () => {
    if (filter === 'available') {
      return donors.filter(donor => donor.isAvailable !== false);
    }
    if (filter === 'unavailable') {
      return donors.filter(donor => donor.isAvailable === false);
    }
    return donors;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const filteredDonors = getFilteredDonors();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Registered Donors</h1>
            <p className="text-gray-600">View all registered blood donors and their information</p>
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Donors ({donors.length})</option>
            <option value="available">Available Donors</option>
            <option value="unavailable">Unavailable Donors</option>
          </select>
        </div>

        {filteredDonors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No donors found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <motion.div
                key={donor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500"
              >
                {/* Availability Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    donor.isAvailable !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {donor.isAvailable !== false ? '✅ Available' : '❌ Unavailable'}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Donor
                  </span>
                </div>

                {/* Donor Information */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-400" />
                    <span className="font-semibold text-gray-900">
                      {donor.name || 'Name not provided'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-gray-400" />
                    <span className="text-gray-700">{donor.phone || 'Phone not provided'}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaTint className="text-red-500" />
                    <span className="font-medium text-red-600">
                      {donor.bloodGroup || 'Blood group not specified'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span className="text-gray-700">
                      {donor.city || 'Location not provided'}
                    </span>
                  </div>

                  {donor.age && (
                    <div className="flex items-center space-x-2">
                      <FaBirthdayCake className="text-gray-400" />
                      <span className="text-gray-700">{donor.age} years old</span>
                    </div>
                  )}

                  {donor.weight && (
                    <div className="flex items-center space-x-2">
                      <FaWeight className="text-gray-400" />
                      <span className="text-gray-700">{donor.weight} kg</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <FaCalendar className="text-gray-400" />
                    <span className="text-gray-700 text-sm">
                      Joined: {new Date(donor.joinedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 mb-1">Contact Details</h4>
                  <p className="text-sm text-gray-600">Email: {donor.email}</p>
                  <p className="text-sm text-gray-600">Phone: {donor.phone || 'Not provided'}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorManagement;