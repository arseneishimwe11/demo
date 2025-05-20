import React from "react";
import Button from "../common/Button";

const Contact = () => {
  return (
    <section className="py-20 relative z-10 bg-[rgba(10,10,10,1.00)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to transform your parking management?
            </h2>
            <p className="text-gray-400 mb-8">
              Get in touch with our team to schedule a demo and see how ParkEase can revolutionize your parking operations.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-[rgba(219,251,54,1.00)] font-bold mb-2">Email</h3>
                <p className="text-white">contact@parkease.com</p>
              </div>
              
              <div>
                <h3 className="text-[rgba(219,251,54,1.00)] font-bold mb-2">Phone</h3>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
              
              <div>
                <h3 className="text-[rgba(219,251,54,1.00)] font-bold mb-2">Address</h3>
                <p className="text-white">
                  123 Innovation Drive<br />
                  Tech Park, Suite 500<br />
                  San Francisco, CA 94107
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[rgba(15,15,15,0.6)] p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-[rgba(30,30,30,1.00)] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[rgba(219,251,54,1.00)]" 
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-[rgba(30,30,30,1.00)] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[rgba(219,251,54,1.00)]" 
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-400 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-[rgba(30,30,30,1.00)] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[rgba(219,251,54,1.00)]" 
                  placeholder="Subject"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  className="w-full bg-[rgba(30,30,30,1.00)] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[rgba(219,251,54,1.00)]" 
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <Button className="w-full py-3 bg-[rgba(219,251,54,1.00)] text-black hover:bg-[rgba(200,230,50,1.00)] transition-all duration-300">
                <span className="font-bold">Send Message</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;