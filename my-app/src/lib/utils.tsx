import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CnFunction {
  (...inputs: unknown[]): string;
}

export const cn: CnFunction = (...inputs) => {
  return twMerge(clsx(inputs));
};

