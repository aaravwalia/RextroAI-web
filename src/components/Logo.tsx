import React from "react";

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ overflow: "visible" }}
  >
    <defs>
      <linearGradient id="rextro-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00F0FF" />
        <stop offset="45%" stopColor="#4A60FF" />
        <stop offset="100%" stopColor="#E000FF" />
      </linearGradient>
    </defs>
    
    <path
      d="M 20 20 
         L 65 20 
         L 85 40 
         L 85 50 
         L 70 65 
         L 90 85 
         L 70 85 
         L 50 65 
         L 50 38 
         L 40 38 
         L 40 85 
         L 20 85 
         Z"
      fill="url(#rextro-gradient)"
    />
    
    <text
      x="-61.5"
      y="45"
      transform="rotate(-90)"
      fill="#FFFFFF"
      fontSize="7.2"
      fontWeight="400"
      fontFamily="'Inter', sans-serif"
      letterSpacing="1.2"
      textAnchor="middle"
      dominantBaseline="central"
    >
      REXTROAI
    </text>
  </svg>
);
