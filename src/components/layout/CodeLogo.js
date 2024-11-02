import React from 'react';
import { motion } from 'framer-motion';

const CodeLogo = () => {
  return (
    <motion.div
      className="w-8 h-8 mr-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <motion.stop
              offset="0%"
              animate={{
                stopColor: ["#00ffa3", "#00ccff", "#00ffa3"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.stop
              offset="100%"
              animate={{
                stopColor: ["#00ccff", "#00ffa3", "#00ccff"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </linearGradient>
          
          <filter id="codeGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <motion.rect
          x="50" y="50"
          width="300" height="300"
          rx="10"
          fill="rgba(10, 10, 10, 0.8)"
          stroke="url(#codeGradient)"
          strokeWidth="15"
          filter="url(#codeGlow)"
          animate={{
            strokeOpacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <circle cx="90" cy="90" r="8" fill="#ff5f56"/>
        <circle cx="120" cy="90" r="8" fill="#ffbd2e"/>
        <circle cx="150" cy="90" r="8" fill="#27c93f"/>

        <motion.text
          x="100" y="200"
          fill="url(#codeGradient)"
          style={{ fontFamily: 'monospace', fontSize: '80px' }}
          textAnchor="middle"
          filter="url(#codeGlow)"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {"</>"}
        </motion.text>
      </svg>
    </motion.div>
  );
};

export default CodeLogo;