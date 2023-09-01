import { CartsList } from "@/components/CartsList";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "../../../../prisma/client";

export const revalidate = 1;

export default async function Admin() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.userRole !== "ADMIN") redirect("/");
    console.log("SESSION", session);
    // if (!session || session.user.role !== "ADMIN") {
    //   throw new Error("Unauthorized");
    // }

    const carts = await prisma.cart.findMany({
      where: {
        status: "RECEIVED",
      },
      include: {
        customer: true,
      },
    });

    return (
      <main className="min-h-screen w-full py-14 px-4 sm:px-14 md:px-28 lg:px-64">
        <CartsList carts={carts as any} />
      </main>
    );
  } catch (error) {
    console.log(error);
    return <h2>Error</h2>;
  }
}
