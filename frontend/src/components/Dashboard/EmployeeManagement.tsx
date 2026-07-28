"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";

interface Employee {
  _id: string;
  name: string;
  userName: string;
  email: string;
  phone: string;
}

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("auth-token");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/employee-manage/get-all`,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token ?? "",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();
        setEmployees(data.employees);
        console.log("Employees set:", data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("auth-token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/employee-manage/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token ?? "",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleAddEmployee = () => {
    router.push("/admin/user-management/add-user");
  };

  return (
    <div className="relative overflow-x-auto w-full mx-auto">
      <div className="my-5">
        <button
          onClick={handleAddEmployee}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
        >
          Add Employee <i className="fa-solid fa-plus ml-1"></i>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee._id} className="bg-white border-b">
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.userName}</td>
                  <td className="px-6 py-4">{employee.email}</td>
                  <td className="px-6 py-4">{employee.phone}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/user-management/edit-user/${employee._id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer"
                      >
                        <SquarePen />
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer"
                        onClick={() => handleDelete(employee._id)}
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
