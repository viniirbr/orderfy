import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "../../../../prisma/client";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("SESSION", session);
  // if (!session || session.user.role !== "ADMIN") {
  //   throw new Error("Unauthorized");
  // }

  try {
    const createdCarts = await prisma.cart.findMany({
      where: {
        status: "RECEIVED",
      },
      include: {
        customer: true,
      },
    });

    return NextResponse.json(createdCarts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

// export async function GET(response: NextResponse) {
//   try {
//     const session = await getServerSession(authOptions);
//     console.log("SESSION", session);
//     if (!session) {
//       throw new Error("Unauthorized");
//     }
//     const cart = await prisma.cart.findFirst({
//       where: {
//         customerId: session.user.id,
//         status: "CREATING",
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function PUT(request: NextRequest, response: NextResponse) {
//   const session = await getServerSession(authOptions);
//   const { productId, customer } = await request.json();
//   console.log(productId, customer, session);
//   try {
//     if (session) {
//       const cart = await prisma.cart.findFirst({
//         where: {
//           customerId: session.user.id as string,
//           status: "CREATING",
//         },
//         include: {
//           orders: {
//             include: {
//               products: true,
//             },
//           },
//         },
//       });
//        FOUND", cart);
//       const product = await prisma.product.findUnique({
//         where: {
//           id: productId,
//         },
//         select: {
//           name: true,
//           category: true,
//           id: true,
//         },
//       });
//       console.log("PRODUCT FOUND", product);
//       if (cart && product) {
//         console.log("CONNECT", customer, cart.id);
//         const order = await prisma.order.findFirst({
//           where: {
//             cartId: cart.id,
//             customer,
//           },
//           include: {
//             OrdersOnProducts: {
//               include: {
//                 order: true,
//               },
//             },
//           },
//         });
//         console.log("ORDER", order);
//         if (order) {
//           const orderUpdated = await prisma.order.update({
//             where: {
//               customer,
//               cartId: cart.id,
//             },
//             data: {
//               products: {
//                 set: [...order.products, product],
//               },
//             },
//           });
//           console.log("ORDER UPDATE", orderUpdated);
//           return NextResponse.json({
//             order: orderUpdated,
//           });
//         } else {
//           const orderCreated = await prisma.order.create({
//             data: {
//               cartId: cart.id,
//               customer: customer,
//               OrdersOnProducts: {
//                 connect: {
//                   productId: productId,
//                 },
//               },
//             },
//           });
//           console.log("ORDER CREATED", orderCreated);
//           return NextResponse.json({
//             order: orderCreated,
//           });
//         }
//       }
//     }
//   } catch (error) {
//     console.log("ERROR", error);
//   }
// }
