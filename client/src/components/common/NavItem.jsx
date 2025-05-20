import React from "react";

const NavItem = ({ text, isActive, className }) => {
  return (
    <div
      className={`h-[51.00px] rounded-[27px] ${className}`}
    >
      <span
        className={`flex justify-start text-left items-start h-[27.00px] whitespace-nowrap ${
          isActive 
            ? "bg-[rgba(214,236,127,1.00)] bg-clip-text text-transparent" 
            : "bg-[rgba(204,204,204,1.00)] bg-clip-text text-transparent"
        } not-italic text-[18.0px] font-medium leading-[27.00px]`}
        style={{
          fontFamily: "Space Grotesk",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default NavItem;