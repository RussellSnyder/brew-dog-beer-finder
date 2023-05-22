import { PropsWithChildren } from "react";
import { LinkButton } from "./button";
const IMAGE_SIZE = 75;

interface Props extends PropsWithChildren {
  title: string;
  cta: {
    label: string;
    href: string;
  };
  size?: "lg" | "sm";
}

export const Card = ({ title, cta, children, size = "lg" }: Props) => {
  return (
    <div className="border-2 p-4" data-cy="card">
      <div
        className={`flex flex-col ${
          size === "lg" ? "h-96" : "h-52"
        } content-middle`}
      >
        <h2 className="text-lg font-bold mb-6 text-center h-2">{title}</h2>
        <div className="relative m-auto">{children}</div>
      </div>
      <div className="flex justify-center">
        <LinkButton href={cta.href}>{cta.label}</LinkButton>
      </div>
    </div>
  );
};
