import React, { useEffect, useRef } from 'react';

const HowItWorks = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Install Sensors',
      description: 'Our IoT sensors are installed in each parking space to detect vehicle presence and monitor availability in real-time.'
    },
    {
      number: '02',
      title: 'Connect to Platform',
      description: 'Sensors connect to our cloud platform, providing real-time data on parking space occupancy and availability.'
    },
    {
      number: '03',
      title: 'Mobile Integration',
      description: 'Users can find, reserve, and pay for parking spaces through our mobile app or web interface.'
    },
    {
      number: '04',
      title: 'Analytics & Reporting',
      description: 'Facility managers gain insights through comprehensive analytics and reporting tools to optimize operations.'
    }
  ];

  return (
    <div className="py-20 bg-black relative">
      {/* Background car silhouette */}
      <div className="absolute right-0 bottom-0 opacity-10 h-full overflow-hidden">
        <img 
          src="/assets/images/car-silhouette.png" 
          alt="Car Silhouette" 
          className="h-full object-contain"
        />
      </div>
      
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 opacity-0 transition-opacity duration-1000">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How ParkEase Works</h2>
          <div className="h-1 w-20 bg-lime-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our intelligent parking management system simplifies the entire process from finding a spot to payment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex">
              <div className="mr-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-lime-400 text-black font-bold text-xl">
                  {step.number}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Smart Parking Management</h3>
              <p className="text-gray-400 mb-6">
                ParkEase uses advanced IoT sensors and AI algorithms to provide real-time parking availability information, 
                reducing congestion and improving the overall parking experience.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-lime-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Reduce time spent finding parking by up to 30%</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-lime-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Increase parking revenue by optimizing space utilization</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-lime-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Reduce emissions from vehicles searching for parking</span>
                </li>
              </ul>
            </div>
            <div className="relative h-64 md:h-auto">
              <img 
                src="/assets/images/parking-dashboard.jpg" 
                alt="Parking Dashboard" 
                className="rounded-lg h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;