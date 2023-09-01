import React from "react";
import "../globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Orderfy",
  description: "The best way to order",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex items-center justify-between bg-white shadow-md py-5 px-4 border-b-gray-300 border-b-2 md:px-32 xl:px-64">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Logo
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
