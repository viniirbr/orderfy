import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(
  request: Request,
  { params }: { params: { cartId: string } }
) {
  const { cartId } = params;
  const { customerName } = await request.json();
  try {
    const orderCreated = await prisma?.order.create({
      data: {
        customer: customerName,
        Cart: {
          connect: {
            id: cartId,
          },
        },
      },
    });
    return NextResponse.json(orderCreated, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { cartId: string } }
) {
  const { cartId } = params;
  const { dueDate, status } = await request.json();
  const adjustedDate = new Date(dueDate);
  // adjustedDate.setHours(adjustedDate.getHours() + 1);

  try {
    const cart = await prisma?.cart.update({
      where: {
        id: cartId,
      },
      data: {
        due: adjustedDate,
        status: "RECEIVED",
      },
    });
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
