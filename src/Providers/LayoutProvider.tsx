"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LayoutProvider = ({ children }: any) => {
  const pathname = usePathname();
  const isPublicPage = pathname === "/login" || pathname === "/register";
  return (
    <>
      {/*condition ? consequent : alternative */}
      {!isPublicPage && (
        <div className="header d-flex text-align-center justify-end">
          <div className="inner justify-end">
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutProvider;
