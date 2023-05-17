import Link from "next/link";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  href: string;
}

export const Button = ({ children, href }: Props) => (
  <Link href={href} className="p-4 bg-cyan-600 rounded font-bold text-white">
    {children}
  </Link>
);
