"use client";

import { Product } from "@/shared/interfaces/Product";
import { Button } from "../UI/Button";
import { axiosBase } from "@/shared/api";
import { useRouter } from "next/navigation";
import hamburguerPic from "../../../public/hamburguer.png";
import Image from "next/image";
import { BsPlus } from "react-icons/bs";

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
    <div className="flex flex-col max-w-[300px] p-2 shadow-md min-w-[140px] gap-2 rounded-md lg:max-w-[100px]">
      <div className="w-full aspect-square bg-gray-200 rounded-md relative">
        <Image src={hamburguerPic} alt="Mocked food image" />
        <button
          className="bottom-4 right-5 absolute bg-white rounded-full p-1 hover:shadow-lg hover:transition-all"
          onClick={addProductToOrder}
        >
          <BsPlus size={28} className="text-primary-300 front-bold" />
        </button>
      </div>
      <h2 className="font-bold">{product.name}</h2>
      <p className="font-bold text-gray-500 text-sm">
        Mayo, Ham, Grated Cheese, Lettuce and Tomato{" "}
      </p>
      <h3 className="font-semibold">€{product.price.toFixed(2)}</h3>
    </div>
  );
}
