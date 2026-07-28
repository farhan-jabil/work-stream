"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface EmployeeFormData {
  name: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  designation: string;
}

const EmployeeForm = () => {
  const params = useParams<{ id?: string }>();
  const id = params?.id;
  const router = useRouter();

  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    designation: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/employee-manage/get/${id}`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token") ?? "",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData(data.employee);
          setFormData((prev) => ({ ...prev, password: "" }));
        })
        .catch((error) => console.error("Error fetching employee:", error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = id
      ? `${process.env.NEXT_PUBLIC_API_URL}/admin/employee-manage/edit/${id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/admin/employee-manage/add`;
    const method = id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token") ?? "",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Employee data:", data);
        router.push("/admin/user-management");
      })
      .catch((error) => console.error(`Error ${id ? "updating" : "adding"} employee:`, error));
  };

  return (
    <div className="container">
      <div className="relative overflow-x-auto w-[80%] mx-auto mt-10">
        <div className="text-2xl text-center font-semibold mb-5">
          {id ? "Edit Employee" : "Add Employee"}
        </div>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Employee Name
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="userName"
              className="peer-focus:font-medium text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              User Name
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="designation"
              className="peer-focus:font-medium text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Designation
            </label>
          </div>

          {!id && (
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
          )}

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;