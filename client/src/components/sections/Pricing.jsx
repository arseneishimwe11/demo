import React from "react";
import PricingCard from "../common/PricingCard";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "99",
      period: "month",
      description: "Perfect for small parking lots",
      features: [
        "Up to 50 parking spaces",
        "Real-time monitoring",
        "Basic mobile app",
        "Payment processing",
        "Email support",
        "Monthly reports"
      ],
      isPopular: false
    },
    {
      name: "Professional",
      price: "199",
      period: "month",
      description: "Ideal for medium-sized facilities",
      features: [
        "Up to 200 parking spaces",
        "Advanced analytics",
        "Custom mobile app",
        "Multiple payment methods",
        "Priority support",
        "Weekly reports",
        "License plate recognition"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large parking networks",
      features: [
        "Unlimited parking spaces",
        "Multiple locations",
        "Advanced security features",
        "Custom integrations",
        "Dedicated account manager",
        "API access",
        "24/7 premium support",
        "Real-time dashboard"
      ],
      isPopular: false
    }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the plan that works best for your parking facility
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;