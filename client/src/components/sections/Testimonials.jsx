import React, { useEffect, useRef, useState } from 'react';

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "ParkEase has transformed how we manage our multi-level parking garage. The real-time monitoring and automated payment system have reduced our operational costs by 25%.",
      author: "Sarah Johnson",
      position: "Operations Manager, City Center Mall",
      image: "/assets/images/testimonial-1.jpg"
    },
    {
      quote: "Since implementing ParkEase, customer complaints about parking have decreased by 70%. The mobile app makes it easy for visitors to find and pay for parking.",
      author: "Michael Chen",
      position: "Facility Director, Grand Hospital",
      image: "/assets/images/testimonial-2.jpg"
    },
    {
      quote: "The analytics provided by ParkEase have been invaluable for optimizing our parking rates and staffing. We've seen a 15% increase in revenue within just three months.",
      author: "David Rodriguez",
      position: "CEO, Urban Parking Solutions",
      image: "/assets/images/testimonial-3.jpg"
    }
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 opacity-0 transition-opacity duration-1000">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <div className="h-1 w-20 bg-[#bfff00] mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from businesses that have revolutionized their parking management with ParkEase.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={testimonial.image || "https://via.placeholder.com/100"} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <svg className="h-10 w-10 text-[#bfff00]/40 mb-4" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L25.864 4z" />
                        </svg>
                        <p className="text-lg text-gray-200 italic mb-4">{testimonial.quote}</p>
                        <div>
                          <h4 className="font-bold text-white">{testimonial.author}</h4>
                          <p className="text-[#bfff00]">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? 'bg-[#bfff00]' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;