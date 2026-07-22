"use client";

import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";

const navItems = [
  { to: "hero", label: "Home" },
  { to: "features", label: "Features" },
  { to: "about", label: "About" },
  { to: "pricing", label: "Pricing" },
  { to: "testimonial", label: "Testimonial" },
  { to: "faq", label: "FAQ" },
  { to: "contact", label: "Contact" },
];

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div
      className={`${
        isSticky
          ? "fixed top-0 left-0 right-0 bg-white bg-opacity-30 backdrop-blur-lg shadow-lg text-[#12123E] border-gray-200 dark:bg-gray-900"
          : "bg-gradient-to-r from-blue-100 via-blue-50 to-green-100 text-[#12123E] border-gray-200 dark:bg-gray-900"
      } ${isSticky ? "p-1" : ""} transition-all duration-2000`}
      style={{ zIndex: 1000 }}
    >
      <nav className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ${isSticky ? "py-0 md:py-2" : "py-0 md:py-4"}`}>
        <ScrollLink to="hero" className="flex items-center p-4 lg:p-0 cursor-pointer">
          <Image src={logo} alt="Work Stream Logo" className="h-[50px] lg:h-[100px] w-[100px] lg:w-[150px] rounded-xl" />
        </ScrollLink>

        {/* Desktop nav */}
        <ul className="font-medium hidden md:flex p-0 space-x-8">
          {navItems.map((item) => (
            <li key={item.to}>
              <ScrollLink
                to={item.to}
                smooth={true}
                duration={500}
                className="nav-link cursor-pointer hover:text-[#9191c4] focus:outline-none transition-colors duration-500 ease-in-out"
                activeClass="active"
              >
                {item.label}
              </ScrollLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex">
          <Link href="/signInUp">
            <button
              type="button"
              className="relative overflow-hidden text-white bg-gradient-to-r from-green-500 to-blue-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 transition-transform duration-500 ease-in-out group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out"></span>
              <span className="relative z-10 flex items-center justify-center">Login</span>
            </button>
          </Link>
        </div>

        {/* Hamburger — opens drawer */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden bg-transparent hover:bg-transparent focus:ring-transparent focus:outline-none"
        >
          <span className="sr-only">Open mobile menu</span>
          <FaBars className="w-5 h-5" />
        </button>
      </nav>

      {/* Mobile drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        direction="right"
        size={280}
        className="!bg-white"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button onClick={closeDrawer} aria-label="Close menu">
              <FaTimes className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <ul className="font-medium flex flex-col p-0 py-4 space-y-6 text-center">
            {navItems.map((item) => (
              <li key={item.to}>
                <ScrollLink
                  onClick={closeDrawer}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  className="nav-link cursor-pointer hover:text-[#9191c4] focus:outline-none transition-colors duration-500 ease-in-out"
                  activeClass="active"
                >
                  {item.label}
                </ScrollLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto p-4">
            <Link href="/signInUp" onClick={closeDrawer}>
              <button
                type="button"
                className="w-full relative overflow-hidden text-white bg-gradient-to-r from-green-500 to-blue-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-transform duration-500 ease-in-out group"
              >
                <span className="relative z-10 flex items-center justify-center">Login</span>
              </button>
            </Link>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;