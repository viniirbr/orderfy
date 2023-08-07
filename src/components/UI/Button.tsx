import { type } from "os";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { IconType } from "react-icons";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  className?: string;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function Button({
  title,
  className,
  iconLeft,
  iconRight,
  type,
  onClick,
}: Props) {
  return (
    <button
      className={`bg-cyan-500 flex items-center justify-center text-white rounded-md p-2 w-full max-w-xl hover:bg-cyan-600 active:bg-cyan-300 ${className}`}
      type={type}
      onClick={onClick}
    >
      {iconLeft}
      {title}
      {iconRight}
    </button>
  );
}
