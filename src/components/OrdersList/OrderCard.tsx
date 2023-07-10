"use client";

import { Order } from "@/shared/interfaces/Order";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AiOutlineDown } from "react-icons/ai";

interface Props {
  order: Order;
}

export function OrderCard({ order }: Props) {
  const { customerName, customerEmail, company, address, time } = order;
  const timeObject = new Date(time);
  return (
    <div className="flex flex-col bg-white w-full rounded-md p-4 shadow-md">
      <header className="self-end">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="flex items-center justify-center rounded-2xl gap-1 bg-gray-200 px-2 py-1"
              aria-label="Customise options"
            >
              <h3 className="font-bold text-gray-600 text-sm">Status</h3>
              <AiOutlineDown className="text-gray-600 font-bold" />
            </button>
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
      </header>
      <div className="flex items-center justify-between">
        <h1>{customerName}</h1>
        <h2>{customerEmail}</h2>
      </div>
      <div className="flex items-center justify-between">
        <h3>{company}</h3>
        <h4>{address}</h4>
      </div>
      <h4>
        {timeObject.getHours() < 10
          ? `0${timeObject.getHours()}`
          : timeObject.getHours()}
        :
        {timeObject.getMinutes() < 10
          ? `0${timeObject.getMinutes()}`
          : timeObject.getMinutes()}
      </h4>
    </div>
  );
}
