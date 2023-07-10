import { nanoid } from "nanoid";
import prisma from "../../../server/prisma";
import { NextResponse } from "next/server";
import { CreateOrderSchema } from "@/schema/order";

export async function POST(request: Request) {
  try {
    const body = CreateOrderSchema.parse(await request.json());
    const datetime = new Date(body.time);
    const order = await prisma.order.create({
      data: {
        id: nanoid(8),
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        company: body.company,
        address: body.address,
        orderText: body.orderText,
        time: new Date(
          datetime.getFullYear(),
          datetime.getMonth(),
          datetime.getDate(),
          datetime.getHours() + 1,
          datetime.getMinutes()
        ),
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

export async function GET(request: Request) {
  try {
    const orders = await prisma.order.findMany();
    return new NextResponse(JSON.stringify(orders));
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
