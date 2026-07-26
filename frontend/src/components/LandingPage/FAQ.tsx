"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Container from "../shared/Container";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I add new employees to the system?",
      answer: `
              To add new employees, go to the "Employee Management" section in the admin dashboard. 
              There, you'll find the option to add a new employee by entering their details, including name, position, department, and contact information. 
              Once added, employees will receive login credentials to access the system.
            `,
    },
    {
      question: "How can I manage employee leave requests?",
      answer: `
              Employees can submit leave requests through the "Leave Management" section in their portal. 
              As an administrator or manager, you will be notified of all new leave requests and can review, approve, or deny them based on company policies. 
              The system will track each employee's leave balance and show any pending requests for easy management.
            `,
    },
    {
      question: "Can employees update their personal information?",
      answer: `
              Yes, employees can update their personal information directly from their profile page within the system. 
              They can change details such as their phone number, address, and emergency contact information. 
              Any changes made by the employee will be visible to HR and relevant departments after approval, if required.
            `,
    },
    {
      question: "How can I track employee attendance?",
      answer: `
              The system allows you to monitor employee attendance in real-time. 
              You can view daily check-ins and check-outs, track working hours, and identify any attendance issues such as missed clock-ins. 
              Attendance reports are available for download or can be used to generate monthly summaries for payroll purposes.
            `,
    },
    {
      question: "How do I generate reports for employee performance?",
      answer: `
              You can generate performance reports by navigating to the "Employee Performance" section. 
              The system allows you to review individual and team performance metrics, including goals achieved, feedback, and productivity. 
              These reports can be exported for further analysis or for use during performance reviews.
            `,
    },
  ];

  return (
    <div className="faq py-32">
      <Container>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-lg md:text-xl mb-12 text-gray-600 text-center">
          Choose the plan that suits you best.
        </p>
        <div className="space-y-5">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleOpen(index)}
                className="w-full px-6 py-5 text-left text-lg font-semibold bg-gradient-to-r from-blue-100 to-green-100 text-gray-800 rounded-t-lg focus:outline-none flex justify-between items-center transition-all duration-300 ease-in-out"
              >
                {item.question}
                <span
                  className={`transition-transform duration-300 ease-in-out ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                >
                  <FaChevronDown className="w-4 h-4 text-gray-500" />
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="px-6 py-4 bg-white text-gray-700">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FAQ;
