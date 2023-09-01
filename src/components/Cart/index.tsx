"use client";
import { Dispatch, SetStateAction } from "react";
import { CartItem } from "./CartItem";
import { AddOrder } from "./AddOrder";
import { ICreateCart } from "@/shared/interfaces/Cart";
import { Input } from "../UI/Inputs";
import { Button } from "../UI/Button";

interface Props {
  cart: ICreateCart | null;
  orderSelected: string;
  setOrderSelected: Dispatch<SetStateAction<string>>;
  onConfirmCart: () => void;
  dueDate: string;
  setDueDate: Dispatch<SetStateAction<string>>;
}

export function Cart({ cart, orderSelected, setOrderSelected, onConfirmCart, dueDate, setDueDate }: Props) {

  return (
    <aside className="hidden w-2/5 max-w-[240px] bg-gradient-to-b from-gray-400 to-gray-300 py-10 px-2 rounded-lg md:flex flex-col gap-10 max-h-screen">
      <div className="flex flex-col gap-5">
        <ul className="flex flex-col gap-2">
          {cart?.orders.map((order) => (
            <CartItem
              key={order.id}
              isSelected={order.id === orderSelected}
              setOrderSelected={setOrderSelected}
              order={order}
              cartId={cart.id}
              resetOrderSelection={() => setOrderSelected(cart.orders[0].id)}
            />
          ))}
        </ul>
        <AddOrder
          setOrderSelected={setOrderSelected}
          cartId={cart?.id as string}
        />
      </div>
      <Input
        type="datetime-local"
        value={dueDate}
        onChangeInput={(event) => setDueDate(event.target.value)}
      />
      <Button title="Confirm order" onClick={onConfirmCart} />
    </aside>
  );
}
