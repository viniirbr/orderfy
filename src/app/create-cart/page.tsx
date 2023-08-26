import { axiosBase } from "@/shared/api";
import { Product, ProductOnOrder } from "@/shared/interfaces/Product";
import { CreateCart } from "./CreateCart";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import prisma from "../../../prisma/client";
import { ICreateCart } from "@/shared/interfaces/Cart";

export default async function CreateCartPage() {
  try {
    const session = await getServerSession(authOptions);
    console.log("SESSION", session?.user);

    if (!session) throw new Error("No session found");

    const productsFromDb = (await axiosBase.get<Product[]>("products")).data;
    const products: Product[] = productsFromDb.map(
      ({ id, category, description, image, name, price }) => ({
        id,
        category,
        description,
        image,
        name,
        price,
      })
    );

    const cart = await prisma.cart.findFirst({
      where: {
        customerId: session.user.id,
        status: "CREATING",
      },
      include: {
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
      },
    });
    if (!cart) {
      console.log("FOI");
      const cartCreated = await prisma.cart.create({
        data: {
          customerId: session.user.id,
          status: "CREATING",
        },
      });
      await prisma.order.create({
        data: {
          customer: session.user.name,
          cartId: cartCreated.id,
        },
      });

      const cart = await prisma.cart.findFirst({
        where: {
          customerId: session.user.id,
          status: "CREATING",
        },
        include: {
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
        },
      });
      return (
        <CreateCart
          products={products}
          cart={
            {
              id: cart?.id,
              orders: cart?.orders.map((order) => ({
                customer: order.customer,
                id: order.id,
                products: order.products
                  ? order.products.map(
                      (product) =>
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
      );
    }

    return (
      <CreateCart
        products={products}
        cart={
          {
            id: cart?.id,
            orders: cart?.orders.map((order) => ({
              customer: order.customer,
              id: order.id,
              products: order.products
                ? order.products.map(
                    (product) =>
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
    );
  } catch (error) {
    console.log("CREATE CART PAGE", error);
  }
}
