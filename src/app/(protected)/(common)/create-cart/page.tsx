import { axiosBase } from "@/shared/api";
import { Product, ProductOnOrder } from "@/shared/interfaces/Product";
import { CreateCart } from "./CreateCart";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/options";
import prisma from "../../../../../prisma/client";
import { ICreateCart } from "@/shared/interfaces/Cart";
import { $Enums } from "@prisma/client";

export const revalidate = 1;

const cartInclude = {
  orders: {
    select: {
      products: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      customer: true,
      id: true,
    },
  },
};

export default async function CreateCartPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  try {
    const session = await getServerSession(authOptions);
    console.log("SESSION", session?.user);

    if (!session) throw new Error("No session found");
    const productsFromDb = await prisma.product.findMany({
      include: { category: true },
    });
    const products: Product[] = productsFromDb.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category.name,
    }));

    let cart:
      | ({
          orders: {
            products: {
              product: {
                id: string;
                category: {
                  name: string;
                };
                name: string;
                price: number;
              };
              quantity: number;
            }[];
            id: string;
            customer: string;
          }[];
        } & {
          id: string;
          createdAt: Date;
          updatedAt: Date;
          customerId: string;
          due: Date | null;
          status: $Enums.CartStatus;
        })
      | null;

    if (searchParams.id) {
      cart = await prisma.cart.findUnique({
        where: {
          id: searchParams.id,
        },
        include: cartInclude,
      });
    } else {
      cart = await prisma.cart.findFirst({
        where: {
          customerId: session.user.id,
          status: "CREATING",
        },
        include: cartInclude,
      });
      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            customerId: session.user.id,
            status: "CREATING",
            orders: {
              create: {
                customer: "You",
              },
            },
          },
          include: cartInclude,
        });
      }
    }

    return (
      <main className="px-4 py-10 flex items-center justify-center md:px-32">
        <CreateCart
          products={products}
          cart={
            {
              id: cart?.id,
              orders: cart?.orders.map((order: any) => ({
                customer: order.customer,
                id: order.id,
                products: order.products
                  ? order.products.map(
                      (product: any) =>
                        ({
                          id: product.product.id,
                          name: product.product.name,
                          category: product.product.category.name,
                          quantity: product.quantity,
                        } as ProductOnOrder)
                    )
                  : [],
              })),
            } as ICreateCart
          }
        />
      </main>
    );
  } catch (error) {
    console.log("CREATE CART PAGE", error);
  }
}
