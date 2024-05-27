"use client";

import { cva } from "class-variance-authority";
import { ComponentPropsWithRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

import { useSidebarContext } from "../sidebar-context";

const navSectionTitle = cva(
  [
    "transition-opacity",
    "text-sm",
    "font-medium",
    "truncate",
    "mb-3",
    "px-5",
    "mr-auto",
    "text-foreground",
  ],
  {
    variants: {
      opened: {
        true: ["opacity-100"],
        false: ["opacity-0"],
      },
    },
  }
);

export interface SidebarNavSectionTitleProps
  extends ComponentPropsWithRef<"li"> {}

const SidebarNavSectionTitle = forwardRef<
  HTMLLIElement,
  SidebarNavSectionTitleProps
>(({ children, className, ...props }, ref) => {
  const { expanded, hovered } = useSidebarContext();
  const opened = expanded || hovered;

  return (
    <li
      ref={ref}
      className={cn(
        navSectionTitle({
          opened,
        }),
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
});

SidebarNavSectionTitle.displayName = "SidebarNavSectionTitle";

export { SidebarNavSectionTitle };
