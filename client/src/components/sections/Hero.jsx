import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero = () => {
  const heroRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-black min-h-screen flex items-center">
      {/* Background car image with low opacity */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/parking-garage.jpg" 
          alt="Parking Garage" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
      
      {/* Floating car illustrations */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 opacity-10 animate-float-slow">
        <img src="/assets/images/car-top-view.png" alt="" className="w-full h-full object-contain" />
      </div>
      
      <div className="absolute bottom-1/3 right-10 w-48 h-48 opacity-10 animate-float">
        <img src="/assets/images/car-side-view.png" alt="" className="w-full h-full object-contain" />
      </div>
      
      {/* Main content */}
      <div 
        ref={heroRef} 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 opacity-0 transition-opacity duration-1000"
      >
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <div className="inline-block bg-[#bfff00]/10 px-4 py-2 rounded-full mb-6">
              <span className="text-[#bfff00] font-medium">Smart Parking Solutions</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Revolutionize Your <br />
              <span className="text-[#bfff00]">Parking Management</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              ParkEase offers comprehensive parking management solutions with real-time monitoring, mobile reservations, and powerful analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button className="px-8 py-4 bg-[#bfff00] text-black rounded-full text-lg font-bold hover:bg-[#a8e600] hover:shadow-lg hover:shadow-[#bfff00]/20">
                  Get Started
                </Button>
              </Link>
              
              <Link to="/login">
                <Button className="px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-full text-lg font-bold hover:border-white/40">
                  Login
                </Button>
              </Link>            </div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#bfff00]/10 rounded-full blur-xl"></div>
              
              {/* Replace the dashboard mockup with a parking management SVG */}
              <div className="relative z-10 rounded-xl shadow-2xl bg-black/80 p-4">
                <svg 
                  viewBox="0 0 600 400" 
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Parking lot background */}
                  <rect x="50" y="50" width="500" height="300" fill="#1a1a1a" rx="10" />
                  
                  {/* Parking spaces */}
                  <g stroke="#bfff00" strokeWidth="2" opacity="0.7">
                    {/* Row 1 */}
                    <rect x="80" y="80" width="60" height="100" fill="#2a2a2a" rx="2" />
                    <rect x="150" y="80" width="60" height="100" fill="#2a2a2a" rx="2" />
                    <rect x="220" y="80" width="60" height="100" fill="#2a2a2a" rx="2" />
                    <rect x="290" y="80" width="60" height="100" fill="#2a2a2a" rx="2" />
                    <rect x="360" y="80" width="60" height="100" fill="#2a2a2a" rx="2" />
                    <rect x="430" y="80" width="60" height="100" fill="#2a2a2a" rx="2" />
                    
                    {/* Row 2 */}
                    <rect x="80" y="220" width="60" height="100" fill="#2a2a2a" rx="2" />
                    <rect x="150" y="220" width="60" height="100" fill="#2a2a2a" rx="2" />
                    <rect x="220" y="220" width="60" height="100" fill="#2a2a2a" rx="2" />
                    <rect x="290" y="220" width="60" height="100" fill="#2a2a2a" rx="2" />
                    <rect x="360" y="220" width="60" height="100" fill="#2a2a2a" rx="2" />
                    <rect x="430" y="220" width="60" height="100" fill="#2a2a2a" rx="2" />
                  </g>
                  
                  {/* Cars in some spaces */}
                  <rect x="85" y="90" width="50" height="80" fill="#3a3a3a" rx="5" />
                  <rect x="155" y="90" width="50" height="80" fill="#444" rx="5" />
                  <rect x="365" y="90" width="50" height="80" fill="#333" rx="5" />
                  <rect x="85" y="230" width="50" height="80" fill="#3a3a3a" rx="5" />
                  <rect x="295" y="230" width="50" height="80" fill="#444" rx="5" />
                  
                  {/* Available space highlight */}
                  <rect x="225" y="85" width="50" height="90" fill="none" stroke="#bfff00" strokeWidth="3" rx="5">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </rect>
                  
                  {/* Driving lane */}
                  <rect x="80" y="190" width="410" height="20" fill="#222" />
                  
                  {/* Dashboard elements */}
                  <rect x="50" y="350" width="500" height="30" fill="#111" rx="5" />
                  <circle cx="80" cy="365" r="10" fill="#bfff00" opacity="0.8" />
                  <rect x="100" y="360" width="60" height="10" fill="#fff" opacity="0.6" rx="2" />
                  <rect x="180" y="360" width="40" height="10" fill="#fff" opacity="0.6" rx="2" />
                  <rect x="240" y="360" width="80" height="10" fill="#fff" opacity="0.6" rx="2" />
                  <rect x="340" y="360" width="50" height="10" fill="#fff" opacity="0.6" rx="2" />
                  <rect x="410" y="360" width="70" height="10" fill="#fff" opacity="0.6" rx="2" />
                  
                  {/* Animated car entering */}
                  <g>
                    <rect x="500" y="190" width="40" height="20" fill="#444" rx="5">
                      <animate 
                        attributeName="x" 
                        from="500" 
                        to="430" 
                        dur="3s" 
                        begin="1s"
                        fill="freeze" 
                      />
                    </rect>
                    <rect x="505" y="185" width="30" height="5" fill="#555" rx="2">
                      <animate 
                        attributeName="x" 
                        from="505" 
                        to="435" 
                        dur="3s" 
                        begin="1s"
                        fill="freeze" 
                      />
                    </rect>
                    <rect x="505" y="210" width="30" height="5" fill="#555" rx="2">
                      <animate 
                        attributeName="x" 
                        from="505" 
                        to="435" 
                        dur="3s" 
                        begin="1s"
                        fill="freeze" 
                      />
                    </rect>
                  </g>
                </svg>
              </div>
              
              {/* Stats floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-gray-800 shadow-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#bfff00]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#bfff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Available Spaces</p>
                    <p className="text-white font-bold text-xl">42/50</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-gray-800 shadow-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Average Time</p>
                    <p className="text-white font-bold text-xl">2.5 hrs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
