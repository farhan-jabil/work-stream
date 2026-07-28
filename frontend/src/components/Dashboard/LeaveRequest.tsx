"use client";

import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

interface LeaveRequest {
  _id: string;
  employeeName: string;
  leaveType: "sick" | "casual" | "vacation" | "maternity" | "paternity" | string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
}

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/request-leave/get-all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token ?? "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched leave requests:", data);
        const pendingRequests = data.requests.filter(
          (request: LeaveRequest) => request.status === "pending"
        );
        setLeaveRequests(pendingRequests);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching leave requests:", error);
        setLoading(false);
      });
  }, []);

  const updateLeaveStatus = (id: string, status: "approved" | "rejected") => {
    const token = localStorage.getItem("auth-token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/request-leave/update-status/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token ?? "",
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Leave ${status.toLowerCase()}:`, data);
        setLeaveRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== id)
        );
      })
      .catch((error) => {
        console.error(`Error ${status.toLowerCase()} leave:`, error);
      });
  };

  const handleApprove = (id: string) => {
    updateLeaveStatus(id, "approved");
  };

  const handleReject = (id: string) => {
    updateLeaveStatus(id, "rejected");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Leave Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Employee Name</th>
              <th scope="col" className="px-6 py-3">Leave Type</th>
              <th scope="col" className="px-6 py-3">Start Date</th>
              <th scope="col" className="px-6 py-3">End Date</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaveRequests.length > 0 ? (
              leaveRequests.map((request) => (
                <tr key={request._id} className="bg-white">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {request.employeeName}
                  </td>
                  <td className="px-6 py-4">
                    {request.leaveType === "sick"
                      ? "Sick Leave"
                      : request.leaveType === "casual"
                      ? "Casual Leave"
                      : request.leaveType === "vacation"
                      ? "Vacation Leave"
                      : request.leaveType === "maternity"
                      ? "Maternity Leave"
                      : request.leaveType === "paternity"
                      ? "Paternity Leave"
                      : "Other"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(request.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(request.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className="text-green-500 hover:text-green-700"
                        onClick={() => handleApprove(request._id)}
                      >
                        <FaCheck className="mr-1 text-xl" />
                      </button>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleReject(request._id)}
                      >
                        <FaTimes className="mr-1 text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No Pending Leave Requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequests;