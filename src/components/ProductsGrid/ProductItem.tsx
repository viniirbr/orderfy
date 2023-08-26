"use client";

import { Product } from "@/shared/interfaces/Product";
import { Button } from "../UI/Button";
import { axiosBase } from "@/shared/api";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
  orderSelected: string;
}
export function ProductItem({ product, orderSelected }: Props) {
  const router = useRouter();
  async function addProductToOrder() {
    try {
      const { data } = await axiosBase.patch(`orders/${orderSelected}`, {
        productId: product.id,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col p-2 shadow-md">
      <div className="w-full h-16 bg-gray-400 rounded-md"></div>
      <h2>{product.name}</h2>
      <h3>{product.price}</h3>
      <Button title="Add" onClick={addProductToOrder} />
    </div>
  );
}
