import React from 'react';
import { motion } from 'framer-motion';

const AuthButton = ({
  type,
  disabled = false,
  isLoading = false,
  onClick,
  children,
  fullWidth = true,
  variant = 'primary'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return isLoading || disabled
          ? 'bg-lime-400/50 text-dark-900/50 cursor-not-allowed'
          : 'bg-lime-400 text-dark-900 hover:bg-lime-300 shadow-lg shadow-lime-400/20';
      case 'secondary':
        return isLoading || disabled
          ? 'bg-primary-500/50 text-white/50 cursor-not-allowed'
          : 'bg-primary-500 text-white hover:bg-primary-400 shadow-lg shadow-primary-500/20';
      case 'outline':
        return isLoading || disabled
          ? 'bg-transparent border border-dark-700 text-dark-400 cursor-not-allowed'
          : 'bg-transparent border border-lime-400 text-lime-400 hover:bg-lime-400/10';
      default:
        return '';
    }
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${fullWidth ? 'w-full' : ''} py-3 px-4 rounded-lg font-bold transition-colors duration-200 ${getVariantClasses()}`}
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin mr-2"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default AuthButton;