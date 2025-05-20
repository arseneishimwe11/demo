import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md py-4 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-white">
              Park<span className="text-lime-400">Ease</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-lime-400 transition-colors">Home</Link>
            <Link to="/features" className="text-white hover:text-lime-400 transition-colors">Features</Link>
            <Link to="/pricing" className="text-white hover:text-lime-400 transition-colors">Pricing</Link>
            <Link to="/about" className="text-white hover:text-lime-400 transition-colors">About</Link>
            <Link to="/contact" className="text-white hover:text-lime-400 transition-colors">Contact</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-white hover:text-lime-400 transition-colors">
              Log In
            </Link>
            <Button className="bg-lime-400 hover:bg-lime-500 text-black px-6 py-2 rounded-full font-medium transition-all duration-300">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-900 rounded-lg p-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-white hover:text-lime-400 transition-colors">Home</Link>
              <Link to="/features" className="text-white hover:text-lime-400 transition-colors">Features</Link>
              <Link to="/pricing" className="text-white hover:text-lime-400 transition-colors">Pricing</Link>
              <Link to="/about" className="text-white hover:text-lime-400 transition-colors">About</Link>
              <Link to="/contact" className="text-white hover:text-lime-400 transition-colors">Contact</Link>
              <div className="pt-4 border-t border-gray-700 flex flex-col space-y-4">
                <Link to="/login" className="text-white hover:text-lime-400 transition-colors">
                  Log In
                </Link>
                <Button className="bg-lime-400 hover:bg-lime-500 text-black px-6 py-2 rounded-full font-medium transition-all duration-300 text-center">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;