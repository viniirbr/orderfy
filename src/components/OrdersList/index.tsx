"use client";

import { Order } from "@/shared/interfaces/Order";
import { OrderCard } from "./OrderCard";
import { DateSelector } from "./DateSelector";
import { useState } from "react";
import { compareDates } from "@/shared/utils/compareDates";

interface Props {
  orders: Order[];
}

export function OrdersList({ orders }: Props) {
  const [date, setDate] = useState(new Date());

  const ordersForDateSelected = orders.filter((order) => {
    const orderDate = new Date(order.time);
    return compareDates(orderDate, date);
  });
  return (
    <div className="flex flex-col items-center">
      <DateSelector value={date} setValue={setDate} />
      <ol className="flex flex-col items-center gap-2 w-full">
        {ordersForDateSelected.length > 0 ? (
          ordersForDateSelected
            .sort(
              (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
            )
            .map((order, id) => (
              <li key={id} className="w-full">
                <OrderCard order={order} />
              </li>
            ))
        ) : (
          <p>No orders for this day</p>
        )}
      </ol>
    </div>
  );
}
