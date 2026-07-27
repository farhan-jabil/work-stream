"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { getRoleFromToken } from "@/utils/auth";

interface FormErrors {
  userName?: string;
  password?: string;
}

const Login = () => {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "User name is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const result = await login({
        userName: userName.trim(),
        password,
      }).unwrap();

      localStorage.setItem("auth-token", result.token);
      toast.success("Logged in successfully");

      const role = getRoleFromToken(result.token);

      if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/employee/dashboard");
      }
    } catch (err: any) {
      const message =
        err?.data?.message || "Invalid username or password. Please try again.";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label className="block text-gray-600 mb-2" htmlFor="login-username">
          User Name
        </label>

        <input
          id="login-username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
            errors.userName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.userName && (
          <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-600 mb-2" htmlFor="login-password">
          Password
        </label>

        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2.5 rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;