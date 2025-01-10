import React from "react";
import Lottie from "react-lottie";
import heroAnimation from "../../animation/hero_animation.json";

const Hero = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: heroAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-green-100 flex items-center justify-center pt-8 pb-16 lg:h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center text-center text-gray-800">
          <div className="w-full mb-8 flex-1">
            <Lottie
              options={defaultOptions}
              height={window.innerWidth < 768 ? 300 : 450}
              width={window.innerWidth < 768 ? 300 : 450}
              style={{ maxWidth: "100%", margin: "0 auto" }}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4">
              Empower Your Workforce Management with{" "}
              <span className="text-blue-600">Work Stream</span>
            </h1>
            <p className="text-sm md:text-xl mb-8">
              Streamline employee data, tasks, and performance tracking with our
              comprehensive system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-semibold rounded-lg transition-transform transform hover:scale-105">
                Start Managing
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 text-white font-semibold rounded-lg transition-transform transform hover:scale-105">
                Watch Overview
              </button>
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-600">
                Trusted by businesses of all sizes to manage their teams
                effectively
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
