import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: params.id,
      },
      select: {
        products: {
          select: {
            productId: true,
            quantity: true,
          },
        },
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
  }
  return true;
}

export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const { productId } = await request.json();
  console.log("ORDER ID", params.orderId);
  try {
    const productOnOrder = await prisma.ordersOnProducts.findUnique({
      where: {
        orderId_productId: { orderId: params.orderId, productId: productId },
      },
      select: {
        quantity: true,
      },
    });

    if (!productOnOrder) {
      const productOnOrderCreated = await prisma.ordersOnProducts.create({
        data: {
          orderId: params.orderId,
          productId,
        },
      });
      return NextResponse.json(productOnOrderCreated, { status: 201 });
    }

    const order = await prisma.ordersOnProducts.update({
      where: {
        orderId_productId: { orderId: params.orderId, productId: productId },
      },
      data: {
        quantity: productOnOrder.quantity + 1,
      },
    });
    console.log(order);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  const { customerName } = await request.json();

  try {
    const editedOrder = await prisma.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        customer: customerName,
      },
    });
    return NextResponse.json(editedOrder, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderDeleted = await prisma.order.delete({
      where: {
        id: params.orderId,
      },
    });
    return NextResponse.json(orderDeleted, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
