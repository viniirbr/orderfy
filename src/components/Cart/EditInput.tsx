"use client";
import { axiosBase } from "@/shared/api";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../UI/Inputs";
import { BsCheckLg as CheckButton } from "react-icons/bs";
import { GrClose as CloseButton } from "react-icons/gr";

interface Props {
  onSave: (inputValue: string) => Promise<AxiosResponse> | undefined;
  setEditing: Dispatch<SetStateAction<boolean>>;
  setOrderSelected: Dispatch<SetStateAction<string>>;
}

export function EditInput({ onSave, setEditing, setOrderSelected }: Props) {
  const [name, setName] = useState("");
  const { refresh } = useRouter();
  async function onAddOrder() {
    try {
      const result = await onSave(name);
      if (result) {
        setEditing(false);
        setName("");
        refresh();
        setOrderSelected(result.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
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
}
