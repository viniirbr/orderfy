"use client";

import { Product } from "@/shared/interfaces/Product";
import { Button } from "../UI/Button";

interface Props {
  product: Product;
}
export function ProductItem({ product }: Props) {
  return <div className="flex flex-col p-2 shadow-md">
    <div className="w-full h-16 bg-gray-400 rounded-md">

    </div>
    <h2>{product.name}</h2>
    <h3>{product.price}</h3>
    <Button title="Add"/>
  </div>;
}
