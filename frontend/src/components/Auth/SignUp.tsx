"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useSignupMutation } from "@/redux/features/auth/authApi";

interface FormErrors {
  name?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup = () => {
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{7,15}$/;

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!userName.trim()) {
      newErrors.userName = "User name is required";
    } else if (userName.trim().length < 3) {
      newErrors.userName = "User name must be at least 3 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(phoneNumber.trim())) {
      newErrors.phoneNumber = "Enter a valid phone number";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      await signup({
        name: name.trim(),
        userName: userName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        password,
      }).unwrap();

      toast.success("Account created successfully");
      router.push("/signInUp/login");
    } catch (err: any) {
      const message = err?.data?.message || "Signup failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSignup} noValidate>
      {/* Name and Username Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
        <div>
          <label className="block text-gray-700 mb-2 text-lg">Name</label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2 text-lg">User Name</label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ${
              errors.userName ? "border-red-500" : ""
            }`}
            placeholder="Enter your user name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.userName && (
            <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
          )}
        </div>
      </div>

      {/* Email and Phone Number Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
        <div>
          <label className="block text-gray-700 mb-2 text-lg">Email</label>
          <input
            type="email"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2 text-lg">
            Phone Number
          </label>
          <input
            type="tel"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>
      </div>

      {/* Password and Confirm Password Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
        <div>
          <label className="block text-gray-700 mb-2 text-lg">Password</label>
          <input
            type="password"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ${
              errors.password ? "border-red-500" : ""
            }`}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2 text-lg">
            Confirm Password
          </label>
          <input
            type="password"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* Signup Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg transform transition duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing up..." : "Signup"}
      </button>

      <p className="text-center text-sm text-gray-500 mt-5">
        Already have an account?{" "}
        <Link
          href="/signInUp/login"
          className="text-blue-500 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default Signup;