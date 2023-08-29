import { getServerSession } from "next-auth";
import prisma from "../../prisma/client";
import { CartCard } from "@/components/CartsList/CartCard";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Customer() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");
  if (session?.user.userRole === "ADMIN") redirect("/admin");
  try {
    const carts = await prisma.cart.findMany({
      where: {
        status: "RECEIVED" || "PREPARING",
        due: {
          gte: new Date(),
        },
      },
      orderBy: {
        due: "asc",
      },
      include: {
        customer: true,
      },
    });
    const dates = carts.map((cart) => {
      return cart.due;
    });
    console.log("DATES BEFORE", dates);
    const uniqueDates = dates.filter((date, id) => {
      const indexOfEqualDate = dates.findIndex(
        (d) =>
          d?.getDate() === date?.getDate() &&
          d?.getMonth() === date?.getMonth() &&
          d?.getFullYear() === date?.getFullYear()
      );
      if (indexOfEqualDate < id) return false;
      return true;
    });
    console.log("DATES", uniqueDates);

    return (
      <main className="flex justify-center min-h-fit w-full py-14 px-4 sm:px-14 md:px-28 lg:px-64">
        <div className="flex flex-col w-full items-center max-w-lg">
          <h1 className="my-5 text-2xl font-bold self-start">
            Incoming orders
          </h1>
          {carts.length > 0 ? (
            uniqueDates.map((date, id) => (
              <section key={id} className="w-full mt-4">
                <h2 className="font-semibold">{date?.toDateString()}</h2>
                <ol className="flex flex-col items-center gap-2 mt-4">
                  {carts.map((cart) => {
                    if (
                      cart.due?.getDate() === date?.getDate() &&
                      cart.due?.getMonth() === date?.getMonth() &&
                      cart.due?.getFullYear() === date?.getFullYear()
                    ) {
                      return (
                        <li
                          key={cart.id}
                          className="w-full flex justify-center"
                        >
                          <CartCard cart={cart as any} />
                        </li>
                      );
                    }
                  })}
                </ol>
              </section>
            ))
          ) : (
            <div className="min-h-[400px] flex items-center justify-center">
              <p className="font-bold text-lg">No incoming orders</p>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.log("ERROR", error);
  }
}
