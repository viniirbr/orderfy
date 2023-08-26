"use client";

import { ICartListResponse } from "@/shared/interfaces/Cart";
import { Order } from "@/shared/interfaces/Order";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Props {
  cart: ICartListResponse;
}

export function CartCard({ cart }: Props) {
  const { customer, due } = cart;
  const timeObject = new Date(due);
  return (
    <Link
      href={`carts/${cart.id}`}
      className="flex bg-white w-full p-4 shadow-lg justify-between items-center hover:translate-x-1 transition-all"
    >
      <div className="flex flex-col items-left">
        <h1 className="font-bold text-gray-500 text-lg">{customer.company}</h1>
        <h2 className="font-semibold text-gray-500 text-md">{customer.name}</h2>
      </div>
      <h4 className="font-bold">
        {timeObject.getHours() < 10
          ? `0${timeObject.getHours()}`
          : timeObject.getHours()}
        :
        {timeObject.getMinutes() < 10
          ? `0${timeObject.getMinutes()}`
          : timeObject.getMinutes()}
      </h4>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <BsThreeDotsVertical className="text-gray-600 font-bold" size={18} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px] bg-gray-100 rounded-md p-[5px] shadow-2xl will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <DropdownMenu.Item className="group text-[13px] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[highlighted]:bg-gray-300 cursor-pointer">
              Received
            </DropdownMenu.Item>
            <DropdownMenu.Item className="group text-[13px] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[highlighted]:bg-gray-300 cursor-pointer">
              Preparing
            </DropdownMenu.Item>
            <DropdownMenu.Item className="group text-[13px] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[highlighted]:bg-gray-300 cursor-pointer">
              Went out for delivery
            </DropdownMenu.Item>
            <DropdownMenu.Item className="group text-[13px] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[highlighted]:bg-gray-300 cursor-pointer">
              Delivered
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Link>
  );
}
