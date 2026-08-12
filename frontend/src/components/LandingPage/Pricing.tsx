import { MdCheckCircle } from "react-icons/md";
import Container from "../shared/Container";
import { PricingPlan } from "@/types/landing.types";

const plans: PricingPlan[] = [
  {
    name: "Basic Plan",
    price: 19,
    tagline: "Perfect for individuals starting out.",
    features: [
      "10 Projects",
      "5 GB Storage",
      "Basic Support",
      "Access to Community Forum",
      "Regular Updates",
    ],
    gradient: "from-indigo-500 to-purple-600",
    textAccent: "text-indigo-600",
    buttonText: "Get Started",
  },
  {
    name: "Standard Plan",
    price: 49,
    tagline: "Ideal for growing businesses.",
    features: [
      "50 Projects",
      "20 GB Storage",
      "Priority Support",
      "Access to Premium Tutorials",
      "Monthly Webinars",
    ],
    gradient: "from-teal-500 to-green-600",
    textAccent: "text-teal-600",
    buttonText: "Get Started",
  },
  {
    name: "Premium Plan",
    price: 99,
    tagline: "For advanced and large-scale needs.",
    features: [
      "Unlimited Projects",
      "100 GB Storage",
      "24/7 Support",
      "Dedicated Account Manager",
      "Custom Analytics Reports",
    ],
    gradient: "from-pink-500 to-red-600",
    textAccent: "text-pink-600",
    buttonText: "Get Started",
  },
];

const Pricing = () => {
  return (
    <section className="bg-white py-32">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 text-center">
          Our Pricing
        </h2>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Choose the plan that suits you best.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`w-full max-w-sm bg-gradient-to-r ${plan.gradient} text-white rounded-lg shadow-lg overflow-hidden ${
                index > 0 ? "mt-8 md:mt-0" : ""
              }`}
            >
              <div className="p-8 transform transition duration-500 hover:scale-105">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-4 text-3xl font-extrabold">
                  ${plan.price}
                  <span className="text-lg">/mo</span>
                </p>
                <p className="mt-4 text-white/80">{plan.tagline}</p>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <MdCheckCircle className="text-lg mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full py-3 bg-white ${plan.textAccent} font-bold rounded-md hover:bg-gray-100 transition`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Pricing;