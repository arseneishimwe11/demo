import React from "react";

const TestimonialCard = ({ name, position, company, quote, avatar }) => {
  return (
    <div className="bg-[rgba(15,15,15,0.8)] backdrop-blur-sm p-6 rounded-xl">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img 
            src={avatar} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/48?text=User";
            }}
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white">{name}</h4>
          <p className="text-gray-400 text-sm">{position}, {company}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[rgba(219,251,54,0.3)]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      <p className="text-gray-300 mb-4">{quote}</p>
      
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star} 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-[rgba(219,251,54,1.00)]" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;