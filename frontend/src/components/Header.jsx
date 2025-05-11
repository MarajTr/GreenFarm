import React from "react";
import bgImage from '../image/download.jpg';
import { useNavigate } from "react-router-dom";
function header() {
  
const navigate = useNavigate();

  return (
    <div
      className="relative h-[80vh] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        // backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white opacity-70"></div>

      {/* Text Content */}
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-xl text-gray-800 mb-2">
          Hello, welcome to Green Farm.
        </h2>
        <h1 className="text-3xl font-bold text-green-700">
          Farmer’s Equipments{" "}
          <span className="text-gray-900">at reasonable</span>
          <br />
          and affordable prices.
        </h1>
        <p className="text-gray-800 mt-2">Start now with just one click.</p>
        <button 
  className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 inline-flex items-center space-x-2"
  onClick={() => navigate('/dashboard')} // Add this line
> 
  <span>Book Now</span>
  <span>➜</span>
</button>
      </div>
    </div>
  );
}

export default header;
