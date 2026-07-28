"use client";

import React, { useEffect, useState } from "react";

const leaveTypeMap: Record<string, string> = {
  sick: "Sick Leave",
  casual: "Casual Leave",
  vacation: "Vacation Leave",
  maternity: "Maternity Leave",
  paternity: "Paternity Leave",
};

interface Leave {
  _id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const EmployeeDashboard = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        setLeaves(data.requests);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching leaves:", error);
        setError("Failed to load leave requests");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("auth-token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/request-leave/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token ?? "",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setLeaves(leaves.filter((leave) => leave._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting leave:", error);
      });
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className=" bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Employee Dashboard
      </h2>

      {/* Leave Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
          <h3 className="text-lg font-semibold">Pending Leave Requests</h3>
          <p className="mt-2 text-4xl font-bold">
            {leaves.filter((leave) => leave.status === "pending").length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
          <h3 className="text-lg font-semibold">Approved Leaves</h3>
          <p className="mt-2 text-4xl font-bold">
            {leaves.filter((leave) => leave.status === "approved").length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
          <h3 className="text-lg font-semibold">Rejected Leaves</h3>
          <p className="mt-2 text-4xl font-bold">
            {leaves.filter((leave) => leave.status === "rejected").length}
          </p>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          All Leave Requests
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-2">Leave Type</th>
                <th className="border-b-2 p-2">Start Date</th>
                <th className="border-b-2 p-2">End Date</th>
                <th className="border-b-2 p-2">Reason</th>
                <th className="border-b-2 p-2">Status</th>
                <th className="border-b-2 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length > 0 ? (
                leaves.map((leave) => (
                  <tr key={leave._id} className="border-b">
                    <td className="p-2">{leaveTypeMap[leave.leaveType]}</td>
                    <td className="p-2">{formatDate(leave.startDate)}</td>
                    <td className="p-2">{formatDate(leave.endDate)}</td>
                    <td className="p-2">{leave.reason}</td>
                    <td className="p-2">
                      <span
                        className={`inline-block py-1 px-4 rounded-full text-sm font-semibold ${getStatusColor(
                          leave.status
                        )}`}
                        aria-label={leave.status}
                      >
                        {capitalizeStatus(leave.status)}
                      </span>
                    </td>
                    <td className="p-2">
                      {leave.status === "pending" ? (
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleDelete(leave._id)}
                          aria-label="Cancel Leave"
                        >
                          Cancel Leave
                        </button>
                      ) : (
                        <span className="text-gray-500">Can't cancel</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;