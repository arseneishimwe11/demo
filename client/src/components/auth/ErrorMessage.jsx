import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <motion.div 
      className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-5 flex items-start"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AlertTriangle size={18} className="mr-2 mt-1 flex-shrink-0" />
      <span>{message}</span>
    </motion.div>
  );
};

export default ErrorMessage;