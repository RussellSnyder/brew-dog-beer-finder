import { PropsWithChildren } from "react";
import { itimFont } from "../fonts";

export const PageTitle = ({ children }: PropsWithChildren) => (
  <h1 className={`text-3xl ${itimFont.className}`}>{children}</h1>
);

export const PageSubtitle = ({ children }: PropsWithChildren) => (
  <h2 className={`text-xl font-bold`}>{children}</h2>
);
