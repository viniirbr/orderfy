"use client";

import { Order } from "@/shared/interfaces/Order";
import { CartCard } from "./CartCard";
import { DateSelector } from "./DateSelector";
import { useState } from "react";
import { compareDates } from "@/shared/utils/compareDates";
import { ICartListResponse } from "@/shared/interfaces/Cart";

interface Props {
  carts: ICartListResponse[];
}

export function CartsList({ carts }: Props) {
  const [date, setDate] = useState(new Date());

  const ordersForDateSelected = carts.filter((cart) => {
    const cartDate = new Date(cart.due);
    return compareDates(cartDate, date);
  });
  return (
    <div className="flex flex-col items-center">
      <DateSelector value={date} setValue={setDate} />
      <ol className="flex flex-col items-center gap-2 w-full">
        {ordersForDateSelected.length > 0 ? (
          ordersForDateSelected
            .sort(
              (a, b) => new Date(a.due).getTime() - new Date(b.due).getTime()
            )
            .map((cart, id) => (
              <li key={id} className="w-full">
                <CartCard cart={cart} />
              </li>
            ))
        ) : (
          <p>No orders for this day</p>
        )}
      </ol>
    </div>
  );
}
