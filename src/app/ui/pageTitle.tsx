import { PropsWithChildren } from "react";
import { itimFont } from "../fonts";

export const PageTitle = ({ children }: PropsWithChildren) => (
  <h1 className={`text-3xl mb-8 ${itimFont.className}`}>{children}</h1>
);
