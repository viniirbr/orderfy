import { Order } from "@/shared/interfaces/Order";
import { axiosBase } from "@/shared/api";
import { CartsList } from "@/components/CartsList";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { ICartListResponse } from "@/shared/interfaces/Cart";
import prisma from "../../../../prisma/client";
import { CartCard } from "@/components/CartsList/CartCard";

export default async function Customer() {
  try {
    const session = await getServerSession(authOptions);
    const carts = await prisma.cart.findMany({
      where: {
        status: "RECEIVED",
      },
      include: {
        customer: true,
      },
    });
    console.log("SESSION", session);

    return (
      <main className="flex justify-center min-h-fit w-full py-14 px-4 sm:px-14 md:px-28 lg:px-64">
        <div className="flex flex-col w-full items-center max-w-lg">
          <h1 className="my-5 text-2xl font-bold self-start">
            Incoming orders
          </h1>
          {carts.length > 0 ? (
            <ol className="flex flex-col items-center gap-2 w-full mt-4">
              {carts
                .sort(
                  (a: any, b: any) =>
                    new Date(a.due).getTime() - new Date(b.due).getTime()
                )
                .map((cart, id) => (
                  <li key={id} className="w-full flex justify-center">
                    <CartCard cart={cart as any} />
                  </li>
                ))}
            </ol>
          ) : (
            <div className="min-h-[400px] flex items-center justify-center">
              <p className="font-bold text-lg">No orders for this day</p>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.log("ERROR", error);
  }
}
