// src/components/services/ServiceCard.js
import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ service, onClick, onHover, onHoverEnd, isHovered, index }) => {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className="relative backdrop-blur-lg bg-white/10 rounded-xl p-6 cursor-pointer overflow-hidden"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      onClick={onClick}
      onHoverStart={onHover}
      onHoverEnd={onHoverEnd}
      style={{
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isHovered ? `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px ${service.color}33` : '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        style={{
          background: `radial-gradient(circle at center, ${service.color}55 0%, transparent 70%)`
        }}
      />
      <div className="relative z-10">
        <motion.div 
          className="text-5xl mb-4"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {service.icon}
        </motion.div>
        <motion.h3 
          className="text-2xl font-bold mb-2 bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(45deg, white, ${service.color})`
          }}
        >
          {service.title}
        </motion.h3>
        <p className="text-gray-300 mb-4">{service.description}</p>
        <ul className="space-y-2">
          {service.features.map((feature, index) => (
            <motion.li
              key={index}
              className="text-sm text-gray-400 flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="mr-2 text-xs" style={{ color: service.color }}>◆</span>
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ServiceCard;