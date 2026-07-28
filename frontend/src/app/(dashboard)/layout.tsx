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
      router.push("/auth/login");
      return;
    }
    setHasToken(true);
  }, [router]);

  const { data, isLoading } = useGetMeQuery(undefined, {
    skip: !hasToken,
  });

  const userName = (data as any)?.user?.name || (data as any)?.name;

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    router.push("/auth/login");
  };

  const navLinkClass = (href: string) =>
    `flex items-center p-3 rounded-lg ${
      pathname.startsWith(href) ? "bg-blue-700" : "hover:bg-blue-800"
    } transition`;

  if (!hasToken) return null;

  return (
    // Single outer flex row: sidebar | (navbar + content) stacked in a column
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-32 lg:w-64" : "w-20"
        } flex-shrink-0 bg-blue-900 text-white flex flex-col transition-all duration-200`}
      >
        {/* Logo / toggle row — same sidebar column, sits above nav links */}
        <div className="flex items-center justify-between bg-blue-700 h-16 px-4">
          <Link href="/" className="flex-shrink-0">
            <Image
              src={logo}
              alt="Work Stream Logo"
              className="h-[30px] w-[30px] md:h-[40px] md:w-[40px] rounded-xl"
            />
          </Link>
          <button
            onClick={toggleSidebar}
            className="text-xl focus:outline-none"
          >
            <FaBars />
          </button>
        </div>

        {/* Nav links — flex-1 so it fills remaining sidebar height, scrolls independently if long */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-6 px-0 lg:px-4">
            <li>
              <Link
                href={isAdmin ? "/admin/dashboard" : "/employee/dashboard"}
                className={navLinkClass(
                  isAdmin ? "/admin/dashboard" : "/employee/dashboard",
                )}
              >
                <FaTachometerAlt className="text-lg flex-shrink-0" />
                <span className={`ml-2 lg:ml-4 ${isOpen ? "block" : "hidden"}`}>
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
                    <FaClipboard className="text-lg flex-shrink-0" />
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
                    <FaUsers className="text-lg flex-shrink-0" />
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
                  <FaClipboard className="text-lg flex-shrink-0" />
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
      </aside>

      {/* Right column: top navbar + scrollable page content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex-shrink-0 flex items-center justify-between h-16 px-4 lg:px-10 bg-blue-900 text-white shadow">
          <h1 className="text-lg lg:text-2xl font-semibold">
            {isAdmin ? "Admin" : "Employee"} Dashboard
          </h1>
          <div className="flex items-center space-x-5">
            <span>
              Hi,{" "}
              <span className="font-semibold">
                {isLoading ? "Loading..." : userName || "User"}
              </span>
            </span>
            <button
              className="flex items-center hover:text-red-300 transition"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="text-lg mr-2" />
            </button>
          </div>
        </header>

        {/* Only this area scrolls */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
