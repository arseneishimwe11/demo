import React from "react";
import Header from "../layout/Header";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Pricing from "../components/sections/Pricing";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";

const ParkEaseWeb = () => {
  return (
    <>
      <div
        id="_2_560__ParkEase_-_Web"
        className="relative overflow-hidden bg-[rgba(5,5,5,1.00)] min-h-screen w-full"
      >
        {/* Background elements */}
        <div
          id="_2_561__Rectangle"
          className="absolute bg-[rgba(5,5,5,1.00)] scale-x-[-1.0] scale-y-[-1.0] origin-[0_0] h-[138.00px] w-[392.00px] left-[-448.00px] top-[-304.00px]"
        ></div>

        <div
          id="_2_562__IMAGE"
          className="absolute h-[280.00px] w-[1512.00px] left-[calc(50%-756.00px)] top-[-5.00px]"
          style={{
            background: "url(assets/images/image.png) 100% / cover no-repeat",
          }}
        ></div>

        <div
          id="_2_563__IMAGE"
          className="absolute h-[462.00px] w-[660.00px] left-[-190.00px] top-[-190.00px]"
          style={{
            background: "url(assets/images/image_1.png) 100% / cover no-repeat",
          }}
        ></div>

        <div
          id="_2_564__IMAGE"
          className="absolute h-[462.00px] w-[660.00px] top-[-190.00px] left-[1031.00px]"
          style={{
            background: "url(assets/images/image_2.png) 100% / cover no-repeat",
          }}
        ></div>

        {/* Components */}
        <Header />
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default ParkEaseWeb;