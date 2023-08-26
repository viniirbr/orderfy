"use client";

import {
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isTextArea?: boolean;
  value: string;
  onChangeInput?: ChangeEventHandler<HTMLInputElement> | undefined;
  onChangeTextArea?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
}
export function Input({
  isTextArea,
  value,
  onChangeInput,
  onChangeTextArea,
  ...props
}: Props) {
  return (
    <>
      {isTextArea ? (
        <textarea
          className="rounded-md p-4 outline-cyan-500 w-full"
          rows={10}
          value={value}
          onChange={(e) => onChangeTextArea && onChangeTextArea(e)}
        />
      ) : (
        <input
          {...props}
          className={`rounded-md p-2 outline-cyan-500 w-full text-sm ${props.className}`}
          value={value}
          onChange={(e) => onChangeInput && onChangeInput(e)}
        />
      )}
    </>
  );
}
