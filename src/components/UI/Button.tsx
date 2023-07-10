import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  className?: string;
}

export function Button({ title, className }: Props) {
  return (
    <button
      className={`bg-cyan-500 text-white rounded-md p-2 w-full max-w-xl hover:bg-cyan-600 active:bg-cyan-300 ${className}`}
    >
      {title}
    </button>
  );
}
