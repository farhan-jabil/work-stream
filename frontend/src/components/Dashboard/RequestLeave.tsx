"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface RequestLeaveFormData {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

const RequestLeave = () => {
  const [formData, setFormData] = useState<RequestLeaveFormData>({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("auth-token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/request-leave/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token ?? "",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Leave request submitted successfully!");
        router.push("/employee/dashboard");
      })
      .catch((error) => {
        console.error("Error submitting leave request:", error);
      });
  };

  return (
    <div className="p-4 lg:p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="leaveType"
          >
            Leave Type
          </label>
          <select
            id="leaveType"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select Leave Type</option>
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="vacation">Vacation Leave</option>
            <option value="maternity">Maternity Leave</option>
            <option value="paternity">Paternity Leave</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="startDate"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="endDate"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="reason"
          >
            Reason
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Provide a reason for your leave"
            required
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestLeave;