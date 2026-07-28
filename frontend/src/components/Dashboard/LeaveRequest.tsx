"use client";

import React from "react";
import { toast } from "sonner";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  useGetAllLeavesQuery,
  useUpdateLeaveStatusMutation,
} from "@/redux/features/leave/leaveApi";

const leaveTypeMap: Record<string, string> = {
  sick: "Sick Leave",
  casual: "Casual Leave",
  vacation: "Vacation Leave",
  maternity: "Maternity Leave",
  paternity: "Paternity Leave",
};

const LeaveRequests = () => {
  const { data: allRequests = [], isLoading } = useGetAllLeavesQuery();
  const [updateLeaveStatus] = useUpdateLeaveStatusMutation();

  const leaveRequests = allRequests.filter(
    (request) => request.status === "pending",
  );

  const handleApprove = async (id: string, employeeName: string) => {
    try {
      await updateLeaveStatus({ id, status: "approved" }).unwrap();
      toast.success(`Leave request approved for ${employeeName}`);
    } catch (error) {
      console.error("Error approving leave:", error);
      toast.error("Failed to approve leave request");
    }
  };

  const handleReject = async (id: string, employeeName: string) => {
    try {
      await updateLeaveStatus({ id, status: "rejected" }).unwrap();
      toast.success(`Leave request rejected for ${employeeName}`);
    } catch (error) {
      console.error("Error rejecting leave:", error);
      toast.error("Failed to reject leave request");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Leave Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Leave Type
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                End Date
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
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
                    {leaveTypeMap[request.leaveType] ?? "Other"}
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
                        onClick={() =>
                          handleApprove(request._id, request.employeeName)
                        }
                      >
                        <FaCheck className="mr-1 text-xl" />
                      </button>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() =>
                          handleReject(request._id, request.employeeName)
                        }
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