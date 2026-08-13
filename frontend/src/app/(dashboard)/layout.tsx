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

  // Admin `/me` response: { name, email, employeeCount, userName, _id, ... }
  // Employee `/me` response: { name, designation, email, phone, role, userName, _id, ... }
  const user = data as any;
  const displayName = user?.name;
  const subtitle = isAdmin
    ? user?.employeeCount !== undefined
      ? `${user.employeeCount} employee${user.employeeCount === 1 ? "" : "s"}`
      : "Administrator"
    : user?.designation || "Employee";
  const userInitial = (displayName || "U").trim().charAt(0).toUpperCase();

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    router.push("/auth/login");
  };

  if (!hasToken) return null;

  // Central nav config so active state, icons, and labels stay in sync
  const navItems = isAdmin
    ? [
        { href: "/admin/dashboard", label: "Dashboard", icon: FaTachometerAlt },
        { href: "/admin/leave-requests", label: "Leave Requests", icon: FaClipboard },
        { href: "/admin/user-management", label: "Manage Employees", icon: FaUsers },
      ]
    : [
        { href: "/employee/dashboard", label: "Dashboard", icon: FaTachometerAlt },
        { href: "/employee/request-leave", label: "Request Leave", icon: FaClipboard },
      ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-56 lg:w-64" : "w-[72px]"
        } group/sidebar flex-shrink-0 bg-slate-900 text-slate-200 flex flex-col transition-[width] duration-200 ease-in-out`}
      >
        {/* Logo / toggle row */}
        <div
          className={`flex items-center h-16 px-4 border-b border-white/5 ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isOpen && (
            <Link href="/" className="flex items-center gap-2 min-w-0">
              <Image
                src={logo}
                alt="Work Stream"
                className="h-8 w-8 rounded-lg flex-shrink-0"
              />
              <span className="font-semibold text-white text-sm tracking-wide truncate">
                Work Stream
              </span>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="flex items-center justify-center h-9 w-9 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 transition-colors"
          >
            <FaBars className="text-base" />
          </button>
        </div>

        {/* Section label */}
        {isOpen && (
          <div className="px-4 pt-5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Menu
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <li key={href} className="relative">
                  <Link
                    href={href}
                    title={!isOpen ? label : undefined}
                    className={`flex items-center gap-3 h-11 rounded-lg text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 ${
                      isOpen ? "px-3" : "justify-center px-0"
                    } ${
                      active
                        ? "bg-indigo-500/15 text-white"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r bg-indigo-400" />
                    )}
                    <Icon
                      className={`text-[15px] flex-shrink-0 ${
                        active ? "text-indigo-400" : ""
                      }`}
                    />
                    {isOpen && <span className="truncate">{label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sign out pinned to bottom of sidebar */}
        <div className="px-3 py-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            title={!isOpen ? "Sign out" : undefined}
            className={`flex items-center gap-3 h-11 w-full rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 ${
              isOpen ? "px-3" : "justify-center px-0"
            }`}
          >
            <FaSignOutAlt className="text-[15px] flex-shrink-0" />
            {isOpen && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      {/* Right column: top navbar + scrollable page content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex-shrink-0 flex items-center justify-between h-16 px-5 lg:px-8 bg-white border-b border-slate-200">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              {isAdmin ? "Admin" : "Employee"} Portal
            </p>
            <h1 className="text-lg lg:text-xl font-semibold text-slate-900 truncate">
              {isAdmin ? "Admin Dashboard" : "Employee Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-sm font-medium text-slate-900">
                {isLoading ? "Loading..." : displayName || "User"}
              </span>
              <span className="text-xs text-slate-400">
                {isLoading ? "" : subtitle}
              </span>
            </div>
            <div className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
              {isLoading ? "…" : userInitial}
            </div>
          </div>
        </header>

        {/* Only this area scrolls */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}