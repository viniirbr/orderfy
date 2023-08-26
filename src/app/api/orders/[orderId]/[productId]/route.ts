import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { orderId: string; productId: string } }
) {
  const { orderId, productId } = params;

  try {
    const productOnOrder = await prisma.ordersOnProducts.findUnique({
      where: {
        orderId_productId: { orderId: orderId, productId: productId },
      },
      select: {
        quantity: true,
      },
    });
    console.log(productOnOrder);

    if (!productOnOrder) throw new Error("Product not found on order");

    if (productOnOrder?.quantity === 1) {
      await prisma.ordersOnProducts.delete({
        where: {
          orderId_productId: { orderId: orderId, productId: productId },
        },
      });
      return NextResponse.json({ message: "Product deleted" }, { status: 200 });
    }
    const order = await prisma.ordersOnProducts.update({
      where: {
        orderId_productId: { orderId: orderId, productId: productId },
      },
      data: {
        quantity: productOnOrder.quantity - 1,
      },
    });
    return NextResponse.json({ message: "One unit deleted" }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
