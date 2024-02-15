import type { Metadata } from "next";
import "./globals.css";
import LayoutProvider from "@/Providers/LayoutProvider";

export const metadata: Metadata = {
  title: "Auth-App",
  description:
    "This is the app built using nextjs, typescript and tailwind css",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
