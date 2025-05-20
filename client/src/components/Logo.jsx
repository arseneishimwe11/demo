import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center">
        <div className="h-10 w-10 bg-lime-400 rounded-full flex items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
        <span className="text-2xl font-bold text-white">Park<span className="text-lime-400">Ease</span></span>
      </div>
    </Link>
  );
};

export default Logo;