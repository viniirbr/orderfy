import Link from "next/link";
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
  href?: string;
  onClick?: () => void;
}

export function Button({
  title,
  className,
  iconLeft,
  iconRight,
  type,
  onClick,
  href,
}: Props) {
  if (href) {
    return (
      <Link
        href={href}
        className={`bg-gradient-to-r from-primary-500 from-10% via-primary-400 via-30% to-primary-300 flex items-center justify-center font-semibold text-white rounded-md p-2 w-full max-w-xl hover:scale-[1.01] transition-all ${className}`}
        type={type}
      >
        {iconLeft}
        {title}
        {iconRight}
      </Link>
    );
  }
  return (
    <button
      className={`bg-gradient-to-r from-primary-500 from-10% via-primary-400 via-30% to-primary-300 flex items-center justify-center font-semibold text-white rounded-md p-2 w-full max-w-xl hover:scale-[1.01] transition-all ${className}`}
      type={type}
      onClick={onClick}
    >
      {iconLeft}
      {title}
      {iconRight}
    </button>
  );
}
