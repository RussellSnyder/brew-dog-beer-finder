import Link from "next/link";
import { PropsWithChildren } from "react";

interface LinkButtonProps extends PropsWithChildren {
  href: string;
}

export const LinkButton = ({ children, href }: LinkButtonProps) => (
  <Link href={href} className="p-4 bg-cyan-600 rounded font-bold text-white">
    {children}
  </Link>
);

interface ButtonProps extends PropsWithChildren {
  onClick: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className="p-4 bg-cyan-600 rounded font-bold text-white"
  >
    {children}
  </button>
);
