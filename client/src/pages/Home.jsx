import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import SearchBar from '../components/home/SearchBar';
import BloodGroups from '../components/home/BloodGroups';
import EmergencyTicker from '../components/home/EmergencyTicker';
import Features from '../components/home/Features';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Hero />
      <EmergencyTicker />
      <SearchBar />
      <BloodGroups />
      <Features />
    </motion.div>
  );
};

export default Home;