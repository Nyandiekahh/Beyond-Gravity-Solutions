// src/components/services/ServiceDetail.js
import React from 'react';
import { motion } from 'framer-motion';

const ServiceDetail = ({ service, onClose }) => {
  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4"
        variants={modalVariants}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {service.icon} {service.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-600 mb-6">{service.description}</p>
        <div>
          <h3 className="font-bold mb-3">Features</h3>
          <ul className="grid grid-cols-2 gap-3">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <span className="mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceDetail;