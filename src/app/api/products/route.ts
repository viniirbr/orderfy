import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { Product } from "@/shared/interfaces/Product";

export async function GET() {
  try {
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
    }))
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
  }
}
