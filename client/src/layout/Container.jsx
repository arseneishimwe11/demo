import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

export default Container;