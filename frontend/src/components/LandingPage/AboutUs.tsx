"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaBullseye,
  FaLightbulb,
  FaHandshake,
  FaCertificate,
} from "react-icons/fa";
import Container from "../shared/Container";
import Counter from "../../lib/counter/Counter";
import { Achievement, ValueCard } from "@/types/landing.types";



const values: ValueCard[] = [
  {
    icon: FaBullseye,
    title: "Our Mission",
    description:
      "Our mission is to empower organizations with a robust leave management system that is easy to use, highly customizable, and designed to enhance productivity. We strive to provide a seamless experience for both employers and employees.",
  },
  {
    icon: FaLightbulb,
    title: "Our Vision",
    description:
      "We envision a world where managing leave is no longer a burden, but a streamlined and efficient process. We aim to continuously innovate and improve our platform to meet the evolving needs of modern workplaces.",
  },
  {
    icon: FaHandshake,
    title: "Our Values",
    description:
      "Integrity, transparency, and commitment are at the core of everything we do. We are dedicated to creating a positive impact on both our clients and their employees.",
  },
];

const primaryAchievements: Achievement[] = [
  { number: 500, label: "Clients Served", bgColor: "bg-[#C9E3F1]" },
  { number: 250, label: "Projects Completed", bgColor: "bg-[#E0F7FA]" },
  { number: 100, label: "Awards Won", bgColor: "bg-[#B9EAB1]" },
];

const secondaryAchievements: Achievement[] = [
  { number: 150, label: "Countries Served", bgColor: "bg-[#B3E5FC]" },
  { number: 300, label: "Team Members", bgColor: "bg-[#D1C4E9]" },
];

const About = () => {
  const [isCounting, setIsCounting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsCounting(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="about py-32 bg-gradient-to-r from-blue-100 via-blue-50 to-green-100">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 text-center">
          About Us
        </h2>
        <p className="text-lg md:text-xl mb-12 text-gray-600 text-center">
          We are dedicated to providing the best leave management solutions for
          organizations of all sizes. Our platform is designed to simplify and
          streamline the process of managing employee leave, ensuring that your
          team remains productive and well-informed.
        </p>

        <div className="flex flex-col md:flex-row items-stretch justify-between mb-12">
          {values.map((value) => (
            <div
              key={value.title}
              className="md:w-1/3 mb-8 md:mb-0 px-4 flex flex-col items-center text-center"
            >
              <value.icon className="text-blue-600 text-6xl mb-4" />
              <h3 className="text-3xl font-semibold mb-4 text-blue-800">
                {value.title}
              </h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>

        <div ref={sectionRef} className="my-16">
          <div className="text-3xl font-semibold mb-8 flex flex-col items-center">
            <FaCertificate className="text-blue-600 text-6xl mb-4" />
            <div className="text-3xl font-semibold mb-4 text-blue-800">
              Our Achievements
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {primaryAchievements.map((item) => (
              <div key={item.label} className="w-full">
                <div
                  className={`block h-full max-w-lg text-center py-12 px-8 mx-auto ${item.bgColor} text-gray-800 shadow-lg rounded-2xl`}
                >
                  <h5 className="mb-2 font-bold">
                    <div className="flex justify-center items-center text-4xl lg:text-6xl">
                      <Counter isCounting={isCounting} number={item.number} />
                      <span>+</span>
                    </div>
                  </h5>
                  <p className="font-semibold mt-8 text-xl lg:text-2xl">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 mt-10">
            {secondaryAchievements.map((item) => (
              <div key={item.label} className="w-full">
                <div
                  className={`block h-full max-w-sm text-center py-12 px-8 mx-auto ${item.bgColor} text-gray-800 rounded-2xl`}
                >
                  <h5 className="mb-2 font-bold">
                    <div className="flex justify-center items-center text-4xl lg:text-6xl">
                      <Counter isCounting={isCounting} number={item.number} />
                      <span>+</span>
                    </div>
                  </h5>
                  <p className="font-semibold mt-8 text-xl lg:text-2xl">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
