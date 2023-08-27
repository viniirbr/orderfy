"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../UI/Button";
import { Input } from "../UI/Inputs";
import { axiosBase } from "@/shared/api";
import { useRouter } from "next/navigation";
import { EditInput } from "./EditInput";

interface Props {
  setOrderSelected: Dispatch<SetStateAction<string>>;
  cartId: string;
}

export function AddOrder({ cartId, setOrderSelected }: Props) {
  const [editing, setEditing] = useState(false);

  async function onAddOrder(customerName: string) {
    try {
      const result = await axiosBase.post(`carts/${cartId}`, {
        customerName,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  if (editing) {
    return (
      <EditInput
        onSave={onAddOrder as any}
        setEditing={setEditing}
        setOrderSelected={setOrderSelected}
      />
    );
  }
  return (
    <h2
      className="text-center font-bold cursor-pointer"
      onClick={() => setEditing(true)}
    >
      Add person
    </h2>
  );
}
