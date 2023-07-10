"use client";

import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  isTextArea?: boolean;
  value: string;
  onChange: (e: any) => void;
}
export function Input({ label, isTextArea, value, onChange, ...props }: Props) {
  return (
    <div className="flex flex-col w-full gap-1 max-w-xl">
      <label className="text-sm text-gray-600 font-bold">
        {label}
        {props.required && "*"}
      </label>
      {isTextArea ? (
        <textarea
          className="rounded-md p-4 outline-cyan-500 w-full"
          rows={10}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          {...props}
          className="rounded-md p-2 outline-cyan-500 w-full"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
