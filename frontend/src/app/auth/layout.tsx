"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";

export default function SignInUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/auth/login";

  return (
    <div className="bg-gradient-to-r from-blue-100 h-screen via-blue-50 to-green-100 flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-center mb-10">
          <Link href="/">
            <Image
              src={logo}
              alt="Work Stream Logo"
              className="h-[40px] md:h-[70px] 3xl:h-[100px] w-[80px] md:w-[100px] 3xl:w-[150px] rounded-xl"
            />
          </Link>
        </div>

        <div
          className={`bg-white p-10 rounded-2xl shadow-2xl ${
            isLogin ? "max-w-md" : "max-w-2xl"
          } w-full mx-auto`}
        >
          <div className="flex justify-center mb-6">
            <Link
              href="/auth/login"
              className={`text-2xl font-bold px-6 py-2 ${
                isLogin
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Login
            </Link>
            <Link
              href="/auth/sign-up"
              className={`text-2xl font-bold px-6 py-2 ${
                !isLogin
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Signup
            </Link>
          </div>

          <div className="form-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
