"use client";
import { Cart } from "@/components/Cart";
import { ProductsGrid } from "@/components/ProductsGrid";
import { Product } from "@/shared/interfaces/Product";
import { ICreateCart } from "@/shared/interfaces/Cart";
import { useState } from "react";

interface Props {
  products: Product[];
  cart: ICreateCart;
}

export function CreateCart({ cart, products }: Props) {
  const [orderSelected, setOrderSelected] = useState(cart?.orders[0]?.id);

  return (
    <div className="flex items-stretch justify-between w-full">
      <ProductsGrid products={products} orderSelected={orderSelected} />
      <Cart
        cart={cart}
        orderSelected={orderSelected}
        setOrderSelected={setOrderSelected}
      />
    </div>
  );
}
