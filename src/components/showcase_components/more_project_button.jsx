import React from 'react';

const MoreProjectButton = () => {
  return (
    <div className="group relative flex justify-center items-center cursor-pointer overflow-hidden rounded-full bg-white text-black size-12 md:size-14 transition-transform duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-black-50 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      
      {/* Default arrow */}
      <svg 
        className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ease-in-out group-hover:translate-x-8 group-hover:-translate-y-8" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19L19 5M19 5v14M19 5H5"></path>
      </svg>

      {/* Hover arrow that slides in from bottom left */}
      <svg 
        className="w-5 h-5 md:w-6 md:h-6 absolute transition-transform duration-500 ease-in-out -translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19L19 5M19 5v14M19 5H5"></path>
      </svg>
    </div>
  );
};

export default MoreProjectButton;
