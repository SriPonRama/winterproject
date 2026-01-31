import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaTint, FaUsers, FaHospital, FaShieldAlt, FaClock } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: FaHeart,
      title: 'Life-Saving Mission',
      description: 'Connecting donors with patients in critical need of blood transfusions'
    },
    {
      icon: FaTint,
      title: 'Blood Compatibility',
      description: 'Smart matching system based on blood types and medical requirements'
    },
    {
      icon: FaUsers,
      title: 'Community Network',
      description: 'Building a strong network of voluntary blood donors across cities'
    },
    {
      icon: FaHospital,
      title: 'Hospital Partnership',
      description: 'Partnering with hospitals and blood banks for efficient blood distribution'
    },
    {
      icon: FaShieldAlt,
      title: 'Safety First',
      description: 'Ensuring all safety protocols and medical standards are maintained'
    },
    {
      icon: FaClock,
      title: '24/7 Emergency',
      description: 'Round-the-clock emergency response system for critical blood requests'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About BloodLink</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BloodLink is a comprehensive blood donation management platform that bridges the gap between donors, hospitals, and patients in need of life-saving blood transfusions.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To create a seamless, efficient, and reliable blood donation ecosystem that saves lives by connecting willing donors with those in urgent need. We leverage technology to make blood donation more accessible, transparent, and impactful for communities worldwide.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <feature.icon className="text-red-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-red-600 text-white rounded-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Making a Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-red-100">Lives Saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5,000+</div>
              <div className="text-red-100">Active Donors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-red-100">Partner Hospitals</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-red-100">Cities Covered</div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How BloodLink Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Register & Create Profile</h3>
              <p className="text-gray-600">Donors, hospitals, and blood banks register and create detailed profiles</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Request & Match</h3>
              <p className="text-gray-600">Hospitals create blood requests and our system matches with compatible donors</p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Donate & Save Lives</h3>
              <p className="text-gray-600">Donors respond to requests and contribute to saving precious lives</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;