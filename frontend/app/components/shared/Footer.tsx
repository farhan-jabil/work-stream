import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Container from "./Container";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Leave Application Management",
  "Real-Time Leave Tracking",
  "Leave Policy Compliance",
  "Reporting & Analytics",
];

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaLinkedinIn, label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-r from-blue-100 via-blue-50 to-green-100 pt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-4">Contact Us</h3>
            <p className="text-gray-600 flex items-center mb-4">
              <FaMapMarkerAlt className="mr-2" /> 1234 Example St, Dhaka, Bangladesh
            </p>
            <p className="text-gray-600 flex items-center mb-4">
              <FaPhoneAlt className="mr-2" /> +880-1234-567890
            </p>
            <p className="text-gray-600 flex items-center mb-4">
              <FaEnvelope className="mr-2" /> info@example.com
            </p>
            <p className="text-gray-600">
              We&apos;re here to help with any inquiries or support related to
              your leave management needs.
            </p>
          </div>

          <div>
            <div>
              <h3 className="text-xl font-bold text-gray-700 mb-4">Quick Links</h3>
              <ul className="text-gray-600 space-y-2 mb-4">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-gray-800">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <span
                    key={social.label}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-4">Our Services</h3>
            <ul className="text-gray-600 space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <div className="hover:text-gray-800">{service}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2">
            <h3 className="text-xl font-bold text-center text-gray-700 mb-4">
              Get in Touch
            </h3>
            <form className="bg-white p-6 border border-gray-300 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Container>
      <div className="mt-20 border-t border-gray-500 py-8 text-center">
        <p className="text-gray-600">&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;