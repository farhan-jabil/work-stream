"use client";

import dynamic from "next/dynamic";
import SlickSlider from "react-slick";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "../shared/Container";
import { Testimonial as TestimonialItem } from "@/types/landing.types";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
}) as typeof SlickSlider;

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};


const testimonialsData: TestimonialItem[] = [
  {
    name: "John Doe",
    title: "CEO, Example Inc.",
    feedback:
      "This product has significantly improved our efficiency and workflow. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    title: "CTO, Tech Solutions",
    feedback:
      "The customer support is fantastic! They helped us with every step of the way.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Alice Brown",
    title: "Manager, Creative Co.",
    feedback:
      "A game-changer for our business. The features are just what we needed.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "David Wilson",
    title: "Founder, Startup Hub",
    feedback:
      "I was amazed at how easy it was to get started and the results were immediate.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Emily Davis",
    title: "Designer, Art Studio",
    feedback:
      "Beautifully designed and easy to use. I would recommend it to anyone.",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

const Testimonial = () => {
  return (
    <section className="py-32 bg-gradient-to-r from-blue-100 via-blue-50 to-green-100">
      <Container size="lg" className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
          Testimonial
        </h2>

        <p className="text-lg md:text-xl mb-12 text-gray-600">
          Discover How We&apos;ve Made a Difference.
        </p>

        <Slider {...settings} className="relative">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.name} className="px-4 h-full">
              <div className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white rounded-lg shadow-lg p-8 mb-8 flex flex-col justify-between h-full min-h-[350px]">
                
                <div className="flex justify-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full border-4 border-white"
                  />
                </div>

                <p className="text-lg mb-4">
                  &quot;{testimonial.feedback}&quot;
                </p>

                <div className="mt-auto">
                  <h4 className="text-xl font-bold">
                    {testimonial.name}
                  </h4>

                  <p className="text-sm">
                    {testimonial.title}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Testimonial;