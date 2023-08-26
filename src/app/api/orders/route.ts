import { nanoid } from "nanoid";
import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { cartId, customerName } = await request.json();
    console.log(cartId, customerName);
    const order = await prisma.order.create({
      data: {
        customer: customerName,
        cartId: cartId,
      },
    });

    return new NextResponse(JSON.stringify(order), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}

// export async function PATCH(request: Request) {
//   try {
//     const { orderId, productId } = await request.json();
//     console.log(orderId, productId);
//     const order = await prisma.ordersOnProducts.create({
//       data: {
//         orderId,
//         productId,
//       },
//     });
//     return new NextResponse(JSON.stringify(order), {
//       status: 201,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new NextResponse(JSON.stringify(error), { status: 500 });
//   }
// }

export async function GET(request: Request) {
  try {
    const orders = await prisma.order.findMany();
    return new NextResponse(JSON.stringify(orders));
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
