import React from 'react';

const Button = ({ children, className, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bfff00] transition-all duration-300 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;