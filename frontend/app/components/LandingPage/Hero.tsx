"use client";

import Lottie from "react-lottie";
import heroAnimation from "@/app/lib/animation/hero_animation.json";
import Container from "../shared/Container";

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
      <Container>
        <div className="flex flex-col lg:flex-row items-center text-center text-gray-800">
          
          {/* Lottie Section */}
          <div className="w-full flex-1 mb-8">
            <Lottie
              options={defaultOptions}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          {/* Content Section */}
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4">
              Empower Your Workforce Management with{" "}
              <span className="text-blue-600">Work Stream</span>
            </h1>

            <p className="text-sm md:text-xl mb-8">
              Streamline employee data, tasks, and performance tracking with
              our comprehensive system.
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
                effectively.
              </p>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Hero;