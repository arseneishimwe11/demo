import React from "react";

const Services = () => {
  const services = [
    {
      title: "Parking Management System",
      description: "Comprehensive solution for managing parking facilities with real-time monitoring and control.",
      image: "assets/images/service-1.jpg"
    },
    {
      title: "Mobile App Integration",
      description: "Seamless integration with mobile applications for user reservations and payments.",
      image: "assets/images/service-2.jpg"
    },
    {
      title: "Revenue Management",
      description: "Advanced tools for optimizing pricing strategies and maximizing revenue generation.",
      image: "assets/images/service-3.jpg"
    }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We provide end-to-end parking management solutions tailored to your specific needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-[rgba(15,15,15,0.6)] rounded-xl overflow-hidden">
              <div 
                className="h-48 w-full" 
                style={{
                  background: `url(${service.image}) center/cover no-repeat`
                }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
                <button className="mt-4 text-[rgba(219,251,54,1.00)] font-medium flex items-center">
                  Learn more
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;