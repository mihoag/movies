import React from 'react';
import { motion } from 'framer-motion';

const ProcessingDots: React.FC = () => {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="h-2 w-2 rounded-full bg-gray-400"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default ProcessingDots;
