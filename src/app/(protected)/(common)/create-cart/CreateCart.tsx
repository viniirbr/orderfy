"use client";
import { Cart } from "@/components/Cart";
import { ProductsGrid } from "@/components/ProductsGrid";
import { Product } from "@/shared/interfaces/Product";
import { ICreateCart } from "@/shared/interfaces/Cart";
import { useState } from "react";
import { CartItem } from "@/components/Cart/CartItem";
import { AddOrder } from "@/components/Cart/AddOrder";

interface Props {
  products: Product[];
  cart: ICreateCart;
}

export function CreateCart({ cart, products }: Props) {
  const [orderSelected, setOrderSelected] = useState(cart?.orders[0]?.id);

  return (
    <div className="flex justify-center w-full items-center md:items-stretch gap-4 lg:gap-8">
      <ProductsGrid products={products} orderSelected={orderSelected} />
      <Cart
        cart={cart}
        orderSelected={orderSelected}
        setOrderSelected={setOrderSelected}
      />
      <div className="flex items-center fixed bottom-0 overflow-auto w-full gap-4 md:hidden p-4">
        <ol className="flex items-center gap-4">
          {cart.orders.map((order) => (
            <CartItem
              key={order.id}
              isSelected={order.id === orderSelected}
              setOrderSelected={setOrderSelected}
              order={order}
              cartId={cart.id}
              resetOrderSelection={() => setOrderSelected(cart.orders[0].id)}
            />
            // <div key={order.id}>{order.customer}</div>
          ))}
        </ol>
        <AddOrder
          setOrderSelected={setOrderSelected}
          cartId={cart?.id as string}
          className="bg-blue-600 text-white p-2 rounded-md"
        />
      </div>
    </div>
  );
}
