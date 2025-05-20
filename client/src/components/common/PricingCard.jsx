import React from "react";

const PricingCard = ({ name, price, period, description, features, isPopular }) => {
  return (
    <div className={`bg-[rgba(15,15,15,0.8)] backdrop-blur-sm p-8 rounded-xl relative h-full flex flex-col ${isPopular ? 'border-2 border-[rgba(219,251,54,1.00)] shadow-lg shadow-[rgba(219,251,54,0.2)]' : 'border border-gray-800'}`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-[rgba(219,251,54,1.00)] text-black font-bold py-1 px-4 rounded-bl-lg rounded-tr-xl">
          Popular
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="flex items-end mb-6">
        <span className="text-4xl font-bold text-white">${price}</span>
        <span className="text-gray-400 ml-2">/{period}</span>
      </div>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[rgba(219,251,54,1.00)] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className={`w-full py-3 rounded-full font-bold transition-all duration-300 ${isPopular ? 'bg-[rgba(219,251,54,1.00)] text-black hover:bg-[rgba(200,230,50,1.00)]' : 'bg-[rgba(30,30,30,1.00)] text-white border border-gray-700 hover:bg-[rgba(40,40,40,1.00)]'}`}>
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;