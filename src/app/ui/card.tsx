import { PropsWithChildren } from "react";
import { LinkButton } from "./button";
import { truncate } from "lodash";
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
    <div className="border-2 p-4 flex flex-col" data-cy="card">
      <div className={`flex-1 mb-4`}>
        <h2 className="text-lg font-bold mb-6 text-center h-2">
          {truncate(title)}
        </h2>
        <div className="relative m-auto">{children}</div>
      </div>
      <div className="flex justify-center">
        <LinkButton href={cta.href}>{cta.label}</LinkButton>
      </div>
    </div>
  );
};
