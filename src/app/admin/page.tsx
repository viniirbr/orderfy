import { Order } from "@/shared/interfaces/Order";
import { axiosBase } from "@/shared/api";
import { CartsList } from "@/components/CartsList";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { ICartListResponse } from "@/shared/interfaces/Cart";
import { redirect } from "next/navigation";

export default async function Admin() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.userRole !== "ADMIN") redirect("/");
    const { data } = await axiosBase.get<ICartListResponse[]>(
      "http://localhost:3000/api/carts"
    );

    return (
      <main className="min-h-screen w-full py-14 px-4 sm:px-14 md:px-28 lg:px-64">
        <CartsList carts={data} />
      </main>
    );
  } catch (error) {
    console.log("ERROR", error);
  }
}
