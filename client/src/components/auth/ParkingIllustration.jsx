import React from 'react';
import { motion } from 'framer-motion';
import { Car, ParkingMeter as Parkingsign } from 'lucide-react';

const ParkingIllustration = () => {
  return (
    <div className="relative w-full h-80 md:h-96">
      {/* Parking sign */}
      <motion.div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-lime-400 w-6 h-40 rounded"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative bg-blue-600 p-6 rounded-sm w-20 h-20 flex items-center justify-center">
            <span className="text-white font-bold text-4xl">P</span>
          </div>
        </div>
      </motion.div>

      {/* Parking lot */}
      <div className="absolute bottom-0 w-full h-20 bg-dark-800 rounded-lg overflow-hidden flex">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-1 border-r border-dashed border-dark-700 relative">
            {i === 2 && (
              <motion.div 
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <Car size={42} className="text-lime-400" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Animated cars */}
      <motion.div 
        className="absolute top-1/3 left-10"
        animate={{ x: [0, 60, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Car size={48} className="text-primary-400" />
      </motion.div>

      <motion.div 
        className="absolute top-2/3 right-10"
        animate={{ x: [0, -60, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <Car size={36} className="text-white opacity-40" />
      </motion.div>

      {/* Parking lights */}
      <motion.div 
        className="absolute top-1/4 right-1/4"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-4 h-4 bg-lime-400 rounded-full shadow-lg shadow-lime-400/20"></div>
      </motion.div>

      <motion.div 
        className="absolute bottom-1/4 left-1/3"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        <div className="w-3 h-3 bg-primary-500 rounded-full shadow-lg shadow-primary-500/20"></div>
      </motion.div>
    </div>
  );
};

export default ParkingIllustration;