"use client";

import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

import { SidebarHeadProps } from "./sidebar-head";
import { useSidebarContext } from "../sidebar-context";

const headTitle = cva(["text-lg", "font-medium", "truncate", "text-wpc-gray"], {
  variants: {
    opened: {
      true: ["ml-2"],
      false: [],
    },
  },
});

const SidebarHeadTitle = forwardRef<HTMLDivElement, SidebarHeadProps>(
  ({ children, className, ...props }, ref) => {
    const { expanded, hovered } = useSidebarContext();

    return (
      <div
        ref={ref}
        className={cn(
          headTitle({
            opened: expanded || hovered,
          }),
          className
        )}
      >
        {children}
      </div>
    );
  }
);

SidebarHeadTitle.displayName = "SidebarHeadTitle";

export { SidebarHeadTitle };
