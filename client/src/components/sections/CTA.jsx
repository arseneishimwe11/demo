import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-parkease-dark to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-car-pattern bg-repeat opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-parkease-card p-12 rounded-2xl border border-white/5 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-parkease-lime/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-parkease-lime/10 rounded-full blur-3xl"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
              Ready to Transform Your Parking Experience?
            </h2>
            
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
              Join thousands of parking operators who have revolutionized their business with ParkEase's smart parking solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/contact"
                className="bg-parkease-lime text-parkease-dark font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all text-center"
              >
                Schedule a Demo
              </Link>
              
              <Link 
                to="/pricing"
                className="bg-white/10 text-white font-bold py-3 px-8 rounded-lg hover:bg-white/20 transition-all text-center"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;