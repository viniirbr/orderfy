import React from "react";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { authOptions } from "../../app/api/auth/[...nextauth]/options";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Orderfy",
  description: "The best way to order",
};

export default function Layout({
  admin,
  customer,
}: {
  admin: React.ReactNode;
  customer: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  // console.log("IS ADMIN", session?.user.userRole === "ADMIN");

  return (
    <p>
      Nested layout
      {/* <header className="flex items-center justify-between bg-white shadow-md py-5 px-4 border-b-gray-300 border-b-2 md:px-32 xl:px-64">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Logo
        </Link>
        <nav className="flex items-center gap-4">
          <Button title="Create new cart" href="create-cart" />
          <ProfileDropdown userName={session?.user.name} />
        </nav>
      </header> */}
      {/* {session?.user.userRole === "ADMIN" ? customer : customer} */}
    </p>
  );
}
