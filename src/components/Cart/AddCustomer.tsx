"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../UI/Button";
import { Input } from "../UI/Inputs";
import { BsCheckLg as CheckButton } from "react-icons/bs";
import { GrClose as CloseButton } from "react-icons/gr";
import { axiosBase } from "@/shared/api";
import { useRouter } from "next/navigation";

interface Props {
  setOrderSelected: Dispatch<SetStateAction<string>>;
  cartId: string;
}

export function AddOrder({ cartId, setOrderSelected }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const { refresh } = useRouter();

  async function onAddOrder() {
    try {
      const result = await axiosBase.post(`carts/${cartId}`, {
        customerName: name,
      });
      console.log(result.data);
      setEditing(false);
      setName("");
      refresh();
      setOrderSelected(result.data.id);
    } catch (error) {
      console.log(error);
    }
  }

  if (editing)
    return (
      <div>
        <Input
          type="text"
          value={name}
          placeholder="Name"
          onChangeInput={(event) => {
            setName(event.target.value);
          }}
          autoFocus
        />
        <div className="flex items-center justify-around py-2">
          <CloseButton
            size={18}
            className="transition-all hover:bg-gray-200 rounded-md px-2 w-8 h-8 hover:cursor-pointer"
            onClick={() => setEditing(false)}
          />
          <CheckButton
            size={22}
            color="#007500"
            className="transition-all hover:bg-gray-200 rounded-md px-2 w-10 h-10 hover:cursor-pointer"
            onClick={onAddOrder}
          />
        </div>
      </div>
    );
  return (
    <h2
      className="text-center font-bold cursor-pointer"
      onClick={() => setEditing(true)}
    >
      Add person
    </h2>
  );
}
