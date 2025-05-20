import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = ({ scrolled, scrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId, event) => {
    event.preventDefault();
    scrollToSection(sectionId);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div
            onClick={(e) => handleNavClick("home", e)}
            className="cursor-pointer"
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              onClick={(e) => handleNavClick("home", e)}
              className="text-lime-300 font-medium"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={(e) => handleNavClick("features", e)}
              className="text-white hover:text-lime-300 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick("how-it-works", e)}
              className="text-white hover:text-lime-300 transition-colors font-medium"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick("pricing", e)}
              className="text-white hover:text-lime-300 transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleNavClick("testimonials", e)}
              className="text-white hover:text-lime-300 transition-colors font-medium"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick("contact", e)}
              className="text-white hover:text-lime-300 transition-colors font-medium"
            >
              Contact
            </a>
            <Link to="/login">
              <button className="bg-lime-400 text-black px-6 py-2 rounded-full font-bold hover:bg-lime-300 transition-colors">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#home"
              onClick={(e) => handleNavClick("home", e)}
              className="block px-3 py-2 text-lime-300 font-medium"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={(e) => handleNavClick("features", e)}
              className="block px-3 py-2 text-white hover:text-lime-300 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick("how-it-works", e)}
              className="block px-3 py-2 text-white hover:text-lime-300 transition-colors font-medium"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick("pricing", e)}
              className="block px-3 py-2 text-white hover:text-lime-300 transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              onClick={(e) => handleNavClick("testimonials", e)}
              className="block px-3 py-2 text-white hover:text-lime-300 transition-colors font-medium"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick("contact", e)}
              className="block px-3 py-2 text-white hover:text-lime-300 transition-colors font-medium"
            >
              Contact
            </a>
            <Link to="/login">
              <button className="block w-full px-3 py-2 bg-lime-400 text-black rounded-full font-bold hover:bg-lime-300 transition-colors text-center mt-4">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
