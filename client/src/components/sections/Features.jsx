import React, { useEffect, useRef } from 'react';

const Features = () => {
  const featuresRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          
          // Add staggered animation to feature cards
          const featureCards = entry.target.querySelectorAll('.feature-card');
          featureCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-slide-up');
            }, index * 100);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-[#bfff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      title: "Real-time Monitoring",
      description: "Track parking space availability and occupancy in real-time with our advanced sensors and monitoring system."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#bfff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      ),
      title: "Mobile Reservations",
      description: "Allow customers to reserve parking spots in advance through our intuitive mobile application."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#bfff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
        </svg>
      ),
      title: "Automated Payments",
      description: "Streamline the payment process with contactless and automated payment options for a seamless experience."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#bfff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      ),
      title: "Analytics Dashboard",
      description: "Gain valuable insights into parking patterns and optimize your facility with our comprehensive analytics."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#bfff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
        </svg>
      ),
      title: "Access Control",
      description: "Secure your parking facility with advanced access control systems including license plate recognition and QR code scanning."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#bfff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: "Guidance System",
      description: "Help drivers find available spaces quickly with our intelligent parking guidance system using LED indicators and mobile directions."
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div 
        ref={featuresRef} 
        className="container mx-auto px-4 sm:px-6 lg:px-8 opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
          <div className="h-1 w-20 bg-[#bfff00] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive parking management solution offers everything you need to optimize your parking operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-[#bfff00]/50 transition-all duration-300 opacity-0 transform translate-y-8"
            >
              <div className="w-16 h-16 bg-[#bfff00]/10 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Car illustration with features */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-[#bfff00]/5 rounded-3xl"></div>
          <div className="relative z-10 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-6">Smart Parking Technology</h3>
                <p className="text-gray-300 mb-8">
                  Our integrated system combines hardware and software solutions to create a seamless parking experience for both operators and users.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#bfff00] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>IoT sensors for real-time space monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#bfff00] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>License plate recognition for automated entry/exit</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#bfff00] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Mobile app for reservations and payments</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#bfff00] mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Digital signage showing available spaces</span>
                  </li>
                </ul>
              </div>
              
              <div className="relative">
                <img 
                  src="/assets/images/smart-parking.png" 
                  alt="Smart Parking Technology" 
                  className="rounded-xl shadow-2xl"
                />
                
                {/* Feature indicators */}
                <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-[#bfff00] rounded-full animate-ping-slow"></div>
                <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-[#bfff00] rounded-full animate-ping-slow animation-delay-300"></div>
                <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-[#bfff00] rounded-full animate-ping-slow animation-delay-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;