import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { get } from "http";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { ProfileDropdown } from "@/components/ProfileDropdown";

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
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
