import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "../../../../../../prisma/client";
import { PrintButton } from "./PrintButton";
import Link from "next/link";
import { LuEdit2 } from "react-icons/lu";
import { BsCupStraw } from "react-icons/bs";

export default async function CartDetails({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("No session found");

  const cart = await prisma.cart.findUnique({
    where: {
      id: params.id,
    },
    include: {
      customer: true,
      orders: {
        include: {
          products: {
            include: {
              product: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (
    cart?.customer.id !== session.user.id &&
    session.user.userRole !== "ADMIN"
  ) {
    throw new Error("You are not allowed to see this cart");
  }

  const categories = await prisma.category.findMany({});

  return (
    <main className="px-4 py-10 flex items-center justify-center md:px-32 xl:px-64">
      <div className="flex flex-col self-start w-full">
        <div className="flex items-center py-10 justify-between">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-bold">{cart?.customer.company}</h1>
            <h2 className="text-xl font-bold">{cart?.customer.name}</h2>
          </div>
          <Link href={`../create-cart?id=${cart?.id}`}>
            <LuEdit2 size={28} />
          </Link>
          <div className="flex items-center gap-4 cursor-pointer">
            <BsCupStraw size={28} />
            <PrintButton
              categories={categories.map(({ name }) => name)}
              cart={cart}
              userName={session.user.name}
            />
          </div>
        </div>
        <ul className="flex flex-col gap-4">
          {cart?.orders.map((order) => {
            return (
              <li key={order.id}>
                <h2 className="font-bold text-xl">
                  {order.customer === "You"
                    ? session.user.name
                    : order.customer}
                </h2>
                <ul>
                  {categories.map((category) => {
                    const products = order.products.filter(
                      (product) => product.product.category.id === category.id
                    );
                    if (products.length === 0) return null;
                    return (
                      <li key={category.id}>
                        <h3 className="font-semibold text-lg">
                          {category.name}
                        </h3>
                        <ul>
                          {products.map((product) => {
                            return (
                              <li key={product.productId}>
                                <p className="text-md">
                                  {product.product.name}
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
