// src/pages/Home.js
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Stats from '../components/home/Stats';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Stats />
      <Services />
    </motion.div>
  );
};

export default Home;