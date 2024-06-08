import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractQuestionPath = (path: string) => {
  const pathSegments = path.split("/").filter(Boolean).slice(0, 2);
  return `/${pathSegments.join("/")}`;
};
