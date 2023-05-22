"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { itimFont } from "../fonts";

interface NavLink {
  href: string;
  name: string;
}
const navLinks: NavLink[] = [
  {
    name: "Food Pairings",
    href: "/",
  },
  {
    name: "All Beers",
    href: "/all-beers",
  },
];

const baseLinkeClassName = "text-white p-4 text-lg font-bold";
const activeLinkClassName = "text-white underline underline-offset-4";
const inActiveLinkClassName = "";

export const HeaderNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-cyan-600 w-full p-4">
      <div className="flex">
        <div className={`${itimFont.className} flex-1 text-white text-2xl`}>
          <Link href="/">Brew Dog Beer Finder</Link>
        </div>
        <div className="flex-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                className={`${baseLinkeClassName} ${
                  isActive ? activeLinkClassName : inActiveLinkClassName
                }`}
                href={link.href}
                key={link.name}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
