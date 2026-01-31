import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaShieldAlt, 
  FaClock, 
  FaHeart, 
  FaMapMarkerAlt, 
  FaUserMd,
  FaMobile,
  FaAward
} from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: FaSearch,
      title: 'Fast Donor Matching',
      description: 'Advanced algorithm matches donors with recipients based on blood type, location, and availability in real-time.',
      color: 'bg-blue-500',
      delay: 0.1
    },
    {
      icon: FaShieldAlt,
      title: 'Verified Blood Banks',
      description: 'All hospitals and blood banks are verified and licensed. Ensuring safe and reliable blood donation process.',
      color: 'bg-green-500',
      delay: 0.2
    },
    {
      icon: FaClock,
      title: 'Emergency Response',
      description: '24/7 emergency response system with instant notifications to nearby donors for critical situations.',
      color: 'bg-red-500',
      delay: 0.3
    },
    {
      icon: FaHeart,
      title: 'Health Monitoring',
      description: 'Track donation history, eligibility status, and health metrics to ensure donor safety and well-being.',
      color: 'bg-pink-500',
      delay: 0.4
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location-Based',
      description: 'GPS-enabled location services to find the nearest donors and blood banks for quick response.',
      color: 'bg-purple-500',
      delay: 0.5
    },
    {
      icon: FaUserMd,
      title: 'Medical Integration',
      description: 'Seamless integration with hospital systems and medical professionals for streamlined operations.',
      color: 'bg-indigo-500',
      delay: 0.6
    },
    {
      icon: FaMobile,
      title: 'Mobile Optimized',
      description: 'Fully responsive design works perfectly on all devices. Donate and request blood on the go.',
      color: 'bg-teal-500',
      delay: 0.7
    },
    {
      icon: FaAward,
      title: 'Recognition System',
      description: 'Earn badges and certificates for your donations. Build your reputation as a life-saving hero.',
      color: 'bg-yellow-500',
      delay: 0.8
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose BloodLink?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform combines cutting-edge technology with compassionate care 
            to create the most efficient blood donation network.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              className="card hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              {/* Icon */}
              <div className={`${feature.color} p-4 rounded-xl mb-6 inline-block group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="text-white text-2xl" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Line */}
              <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: feature.delay + 0.5 }}
                  className={`h-full ${feature.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How BloodLink Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Register & Verify',
                description: 'Sign up as a donor or medical facility. Complete verification process for safety.',
                icon: FaUserMd
              },
              {
                step: '02',
                title: 'Match & Connect',
                description: 'Our system matches blood requests with eligible donors based on compatibility and location.',
                icon: FaSearch
              },
              {
                step: '03',
                title: 'Donate & Save',
                description: 'Complete the donation process at verified facilities and help save lives in your community.',
                icon: FaHeart
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    {step.step}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary-100 p-2 rounded-full">
                    <step.icon className="text-primary-600" />
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h4>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 glass-card p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10,000+', label: 'Lives Saved', icon: FaHeart },
              { number: '5,000+', label: 'Active Donors', icon: FaUserMd },
              { number: '200+', label: 'Partner Hospitals', icon: FaShieldAlt },
              { number: '24/7', label: 'Emergency Support', icon: FaClock }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="text-3xl mx-auto" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;