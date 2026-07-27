"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBars,
  FaClipboard,
  FaUsers,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import logo from "@/assets/logo.png";
import { useGetMeQuery } from "@/redux/features/auth/authApi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [hasToken, setHasToken] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      router.push("/signInUp/login");
      return;
    }
    setHasToken(true);
  }, [router]);

  const { data, isLoading } = useGetMeQuery(undefined, {
    skip: !hasToken,
  });

  const userName = data?.user?.name;

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    router.push("/signInUp/login");
  };

  const navLinkClass = (href: string) =>
    `flex items-center p-3 rounded-lg ${
      pathname.startsWith(href) ? "bg-blue-700" : "hover:bg-blue-800"
    } transition`;

  // Avoid flashing dashboard content before the redirect effect runs
  if (!hasToken) return null;

  return (
    <>
      <div className="flex bg-gray-100">
        <div className="text-white">
          <div
            className={`${
              isOpen ? "w-32 lg:w-64" : "w-20"
            } flex items-center justify-center space-x-3 bg-blue-700 h-full lg:h-16 py-2 pr-4`}
          >
            <Link href="/">
              <Image
                src={logo}
                alt="Work Stream Logo"
                className="h-[20px] md:h-[50px] 3xl:h-[80px] w-[30px] md:w-[70px] 3xl:w-[100px] rounded-xl"
              />
            </Link>
            <button
              onClick={toggleSidebar}
              className="text-xl focus:outline-none"
            >
              <FaBars />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <nav className="flex flex-col lg:flex-row items-center justify-between py-2 lg:py-4 px-4 lg:px-10 bg-blue-900 text-white shadow">
            <h1 className="text-lg lg:text-2xl font-semibold">
              {isAdmin ? "Admin" : "Employee"} Dashboard
            </h1>
            <div className="flex items-center space-x-5">
              Hi,
              <div className="flex items-center ml-2 space-x-4 hover:text-gray-200 transition">
                <span className="font-semibold">
                  {isLoading ? "Loading..." : userName || "User"}
                </span>
              </div>
              <button
                className="flex items-center hover:text-red-300 transition"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="text-lg mr-2" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div className="flex h-screen">
        <div className="text-white">
          <nav
            className={`${
              isOpen ? "block w-32 lg:w-64" : "hidden lg:block w-20"
            } bg-blue-900 h-full py-6`}
          >
            <ul className="space-y-6 px-0 lg:px-4">
              <li>
                <Link
                  href={isAdmin ? "/admin/dashboard" : "/employee/dashboard"}
                  className={navLinkClass(
                    isAdmin ? "/admin/dashboard" : "/employee/dashboard",
                  )}
                >
                  <FaTachometerAlt className="text-lg" />
                  <span
                    className={`ml-2 lg:ml-4 ${isOpen ? "block" : "hidden"}`}
                  >
                    Dashboard
                  </span>
                </Link>
              </li>
              {isAdmin ? (
                <>
                  <li>
                    <Link
                      href="/admin/leave-requests"
                      className={navLinkClass("/admin/leave-requests")}
                    >
                      <FaClipboard className="text-lg" />
                      <span
                        className={`ml-2 lg:ml-4 ${isOpen ? "block" : "hidden"}`}
                      >
                        Leave Requests
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/user-management"
                      className={navLinkClass("/admin/user-management")}
                    >
                      <FaUsers className="text-lg" />
                      <span
                        className={`ml-2 lg:ml-4 ${isOpen ? "block" : "hidden"}`}
                      >
                        Manage Employees
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/employee/request-leave"
                    className={navLinkClass("/employee/request-leave")}
                  >
                    <FaClipboard className="text-lg" />
                    <span
                      className={`ml-2 lg:ml-4 ${isOpen ? "block" : "hidden"}`}
                    >
                      Request Leave
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="p-5 lg:p-10 w-screen overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
