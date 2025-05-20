import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ParkingMeter as Parkingsign } from 'lucide-react';
import ParkingIllustration from './ParkingIllustration';

const AuthLayout = ({ children, title, subtitle, illustrationTitle, illustrationDescription }) => {
  return (
    <div className="min-h-screen flex bg-dark-950">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-dark-950 to-dark-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-parking-pattern bg-cover"></div>
        
        {/* Decorative Elements */}
        <motion.div 
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-lime-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-60 h-60 bg-primary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <div className="relative z-10 max-w-md">
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ParkingIllustration />
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">{illustrationTitle}</h2>
            <p className="text-gray-400">
              {illustrationDescription}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <Link to="/" className="inline-block">
              <motion.div 
                className="flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Parkingsign size={32} className="text-lime-400" />
                <span className="text-3xl font-bold bg-gradient-to-r from-lime-400 to-primary-400 bg-clip-text text-transparent">
                  ParkEase
                </span>
              </motion.div>
            </Link>
            <motion.h1 
              className="text-2xl font-bold text-white mt-6 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {title}
            </motion.h1>
            <motion.p 
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {subtitle}
            </motion.p>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;