"use client";

import { cva } from "class-variance-authority";
import { ComponentPropsWithRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

import { SidebarNavSectionItem } from "./sidebar-nav-section-item";
import { SidebarNavSectionTitle } from "./sidebar-nav-section-title";

const navSection = cva(["flex", "flex-col"], {
  variants: {
    isChild: {
      true: ["bg-background-third"],
      false: [],
    },
  },
});

export interface SidebarNavSectionProps extends ComponentPropsWithRef<"ul"> {
  isChild?: boolean;
}

const SidebarNavSectionRoot = forwardRef<
  HTMLUListElement,
  SidebarNavSectionProps
>(({ children, className, isChild = false, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn(
        navSection({
          isChild,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
});

SidebarNavSectionRoot.displayName = "SidebarNavSection";

const SidebarNavSection = Object.assign(SidebarNavSectionRoot, {
  Title: SidebarNavSectionTitle,
  Item: SidebarNavSectionItem,
});

export { SidebarNavSection };
