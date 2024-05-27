"use client";

import { cva } from "class-variance-authority";
import { ComponentPropsWithRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

import { SidebarNavSection } from "./sidebar-nav-section";
import { useSidebarContext } from "../sidebar-context";

const nav = cva(
  ["overflow-x-hidden", "flex", "flex-col h-full justify-between flex-grow"],
  {
    variants: {
      opened: {
        true: ["overflow-y-auto"],
        false: ["overflow-y-hidden"],
      },
    },
  }
);

export interface SidebarNavProps extends ComponentPropsWithRef<"nav"> {}

const SidebarNavRoot = forwardRef<HTMLElement, SidebarNavProps>(
  ({ children, className, ...props }, ref) => {
    const { expanded, hovered } = useSidebarContext();
    return (
      <nav
        ref={ref}
        className={cn(
          nav({
            opened: expanded || hovered,
          }),
          className
        )}
        {...props}
      >
        {children}
      </nav>
    );
  }
);

SidebarNavRoot.displayName = "SidebarNav";

const SidebarNav = Object.assign(SidebarNavRoot, {
  Section: SidebarNavSection,
});

export { SidebarNav };
