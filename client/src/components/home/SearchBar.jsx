import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaTint } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (bloodGroup) params.append('bloodGroup', bloodGroup);
    if (location) params.append('city', location);
    navigate(`/requests?${params.toString()}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Blood Donors Near You
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search for available blood donors by blood group and location. 
            Connect instantly for emergency needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSearch} className="glass-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Blood Group Selection */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <FaTint className="text-red-500" />
                  <span>Blood Group</span>
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Input */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span>Location</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Search Button */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-transparent">
                  Search
                </label>
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <FaSearch />
                  <span>Search Donors</span>
                </button>
              </div>
            </div>

            {/* Quick Search Tags */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Quick Search:</p>
              <div className="flex flex-wrap gap-2">
                {bloodGroups.slice(0, 4).map((group) => (
                  <button
                    key={group}
                    type="button"
                    onClick={() => {
                      setBloodGroup(group);
                      const params = new URLSearchParams();
                      params.append('bloodGroup', group);
                      if (location) params.append('city', location);
                      navigate(`/requests?${params.toString()}`);
                    }}
                    className="px-3 py-1 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    {group}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => navigate('/emergency')}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-full text-sm font-medium transition-colors duration-200 animate-pulse"
                >
                  Emergency
                </button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-700 text-sm font-medium">
              For medical emergencies, call 911 or visit the nearest hospital
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchBar;