
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const login = () => navigate("/login");
  const register = () => navigate("/register");

  return (
    // Main container: min-h-screen ensures it always fills the viewport height
    <div className="min-h-screen w-full bg-mesh flex flex-col  overflow-x-hidden font-sans">
      
      {/* 1. Upper Section (Sky) - Fixed height on mobile, flexible on desktop */}
      <div className="relative grow flex flex-col justify-center items-center min-h-[50vh] md:min-h-[60vh]">
        {/* Floating Icons - Positioned relative to this container */}
        <div className="absolute top-10 left-10 text-4xl md:text-6xl select-none">🌙</div>
        <div className="absolute top-20 right-10 text-xl md:text-2xl animate-pulse select-none text-black">⭐</div>
        <div className="absolute bottom-20 left-1/4 text-2xl md:text-3xl select-none text-black">⭐</div>
        <div className="absolute top-1/2 right-1/4 text-xl md:text-2xl select-none text-black">⭐</div>
      </div>

      {/* 2. The Wave Transition - Using negative margin to prevent the gap */}
      <div className="w-full leading-0 -mb-1">
        <svg 
          viewBox="0 0 500 150" 
          preserveAspectRatio="none" 
          className="w-full h-24 md:h-48"
        >
          <path 
            d="M0.00,49.98 C150.00,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" 
            className="fill-[#0F0A0A]"
          ></path>
        </svg>
      </div>

      {/* 3. Bottom Action Section (Black) */}
      <div className="bg-[#0F0A0A] flex flex-col items-center px-6 pb-12 pt-4 md:pb-20">
        <div className="w-full max-w-md space-y-6">
          
          {/* Log In Button */}
          <button 
            onClick={login}
            className="w-full py-3.5 md:py-4 rounded-full border border-[#E599FF] text-[#E599FF] text-lg font-medium 
                       hover:bg-[#E599FF] hover:text-[#0F0A0A] transition-all duration-300 active:scale-95"
          >
            Log in
          </button>

          {/* OR Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gray-700 w-16 md:w-24"></div>
            <span className="text-gray-500 text-xs font-bold tracking-widest">OR</span>
            <div className="h-px bg-gray-700 w-16 md:w-24"></div>
          </div>

          {/* Register Button */}
          <button 
            onClick={register}
            className="w-full text-white text-lg font-medium hover:text-[#E599FF] transition-colors"
          >
            Register
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
