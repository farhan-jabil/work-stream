"use client";

import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useGetAllLeavesQuery } from "@/redux/features/leave/leaveApi";
import React from "react";
import { FaUser, FaClipboard, FaChartBar } from "react-icons/fa";

const formatDate = (dateString: string) => {
  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const capitalizeStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    case "approved":
      return "bg-gradient-to-r from-green-400 to-green-600 text-white";
    case "rejected":
      return "bg-gradient-to-r from-red-400 to-red-600 text-white";
    default:
      return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
  }
};

const AdminDashboard = () => {
  const { data: user } = useGetMeQuery();
  const { data: leaveRequests = [] } = useGetAllLeavesQuery();

  const employeeCount = user?.employeeCount ?? 0;
  const pendingCount = leaveRequests.filter(
    (r) => r.status === "pending",
  ).length;
  const approvedCount = leaveRequests.filter(
    (r) => r.status === "approved",
  ).length;
  const rejectedCount = leaveRequests.filter(
    (r) => r.status === "rejected",
  ).length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <FaUser className="text-5xl text-white mb-4" />
          <h3 className="text-2xl font-bold text-white">Employees</h3>
          <p className="text-white mt-2 text-lg">Total: {employeeCount}</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <FaClipboard className="text-5xl text-white mb-4" />
          <h3 className="text-2xl font-bold text-white">Pending Requests</h3>
          <p className="text-white mt-2 text-lg">Total: {pendingCount}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-400 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <FaChartBar className="text-5xl text-white mb-4" />
          <h3 className="text-2xl font-bold text-white">Approved Leaves</h3>
          <p className="text-white mt-2 text-lg">Total: {approvedCount}</p>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-400 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <FaClipboard className="text-5xl text-white mb-4" />
          <h3 className="text-2xl font-bold text-white">Rejected Requests</h3>
          <p className="text-white mt-2 text-lg">Total: {rejectedCount}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Employee Leave Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-collapse border-gray-300 text-center">
            <thead>
              <tr>
                <th className="py-3 px-6 border-b font-medium">
                  Employee Name
                </th>
                <th className="py-3 px-6 border-b font-medium">Leave Start</th>
                <th className="py-3 px-6 border-b font-medium">Leave End</th>
                <th className="py-3 px-6 border-b font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request._id} className="border-b">
                  <td className="py-3 px-6">{request.employeeName}</td>
                  <td className="py-3 px-6">{formatDate(request.startDate)}</td>
                  <td className="py-3 px-6">{formatDate(request.endDate)}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`inline-block py-1 px-4 rounded-full text-sm font-semibold ${getStatusColor(
                        request.status,
                      )}`}
                    >
                      {capitalizeStatus(request.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
