import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const FormInput = ({ id, name, type, label, value, onChange, placeholder, required = false, autoComplete }) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-4 relative">
      <label htmlFor={id} className="block text-gray-300 mb-2 font-medium text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-lg bg-dark-900/80 border ${
            focused ? 'border-lime-400' : 'border-dark-700'
          } text-white focus:outline-none transition-colors duration-200`}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        
        {isPassword && (
          <motion.button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            whileTap={{ scale: 0.95 }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </motion.button>
        )}
        
        {focused && (
          <motion.div 
            className="absolute bottom-0 left-0 h-0.5 bg-lime-400 rounded-b-lg"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </div>
  );
};

export default FormInput;