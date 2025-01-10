import React from "react";

const FeatureSection = () => {
  return (
    <div className="features py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
          Key Features
        </h2>
        <p className="text-lg md:text-xl mb-12 text-gray-600">
          Explore the tools designed to streamline your employee management
          process.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="feature-item bg-gradient-to-r from-green-100 via-blue-50 to-blue-100 p-8 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 min-h-[300px] flex items-center justify-center text-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                Employee Profiles
              </h3>
              <p className="text-gray-700">
                Manage detailed employee profiles, including roles, contact
                details, and performance data.
              </p>
            </div>
          </div>
          <div className="feature-item bg-gradient-to-r from-green-100 via-blue-50 to-blue-100 p-8 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 min-h-[300px] flex items-center justify-center text-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                Task Assignments
              </h3>
              <p className="text-gray-700">
                Assign tasks to employees and track their progress in real time.
              </p>
            </div>
          </div>
          <div className="feature-item bg-gradient-to-r from-green-100 via-blue-50 to-blue-100 p-8 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 min-h-[300px] flex items-center justify-center text-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                Performance Analytics
              </h3>
              <p className="text-gray-700">
                Generate detailed analytics on employee performance and
                productivity.
              </p>
            </div>
          </div>
          <div className="feature-item bg-gradient-to-r from-green-100 via-blue-50 to-blue-100 p-8 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 min-h-[300px] flex items-center justify-center text-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                Attendance Management
              </h3>
              <p className="text-gray-700">
                Keep track of employee attendance and working hours efficiently.
              </p>
            </div>
          </div>
          <div className="feature-item bg-gradient-to-r from-green-100 via-blue-50 to-blue-100 p-8 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 min-h-[300px] flex items-center justify-center text-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                Custom Workflows
              </h3>
              <p className="text-gray-700">
                Create custom workflows to automate routine employee management
                tasks.
              </p>
            </div>
          </div>
          <div className="feature-item bg-gradient-to-r from-green-100 via-blue-50 to-blue-100 p-8 rounded-xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 min-h-[300px] flex items-center justify-center text-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                Notifications & Alerts
              </h3>
              <p className="text-gray-700">
                Get real-time alerts for key updates, deadlines, and actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
