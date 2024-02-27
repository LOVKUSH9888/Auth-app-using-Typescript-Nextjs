"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isPublicPage = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!isPublicPage && (
        <div className="header flex items-center justify-end bg-gray-800 text-white p-4">
          <div className="inner flex gap-4">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/profile" className="hover:text-gray-300">
              Profile
            </Link>
            <Link href="/register" className="hover:text-gray-300">
              Register
            </Link>
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default LayoutProvider;
