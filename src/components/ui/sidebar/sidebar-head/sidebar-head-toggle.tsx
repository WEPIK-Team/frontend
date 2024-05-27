"use client";

import { cva } from "class-variance-authority";
import Image from "next/image";
import { ComponentPropsWithRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

import {
  useSidebarContext,
  useSidebarDispatchContext,
} from "../sidebar-context";
import { sidebarActionEnum } from "../sidebar-types";

const headToggle = cva([
  "flex",
  "items-center",
  "w-7",
  "h-7",
  "p-2",
  "rounded-[8px]",
  "bg-[#6377DD]/5",
  "text-[#65656D]",
]);

const headToggleIcon = cva([
  "transition",
  "transform",
  "duration-250",
  "ease-in-out",
]);

export interface SidebarHeadToggleProps
  extends ComponentPropsWithRef<"button"> {}

const SidebarHeadToggle = forwardRef<HTMLButtonElement, SidebarHeadToggleProps>(
  ({ className, onClick, ...props }, ref) => {
    const { expanded } = useSidebarContext();
    const dispatch = useSidebarDispatchContext();

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.stopPropagation();
      dispatch({ type: sidebarActionEnum.toggle });

      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        title={expanded ? "축소" : "확장"}
        aria-pressed={expanded}
        aria-expanded={expanded}
        data-role="sidebar-head-toggle"
        className={cn(headToggle(), className)}
        onClick={handleClick}
        {...props}
      >
        {expanded ? (
          <Image
            src="/svgs/reduce.svg"
            width={24}
            height={24}
            alt="reduce"
            className={headToggleIcon({})}
          />
        ) : (
          <Image
            src="/svgs/expand.svg"
            width={24}
            height={24}
            alt="expand"
            className={headToggleIcon({})}
          />
        )}
      </button>
    );
  }
);

SidebarHeadToggle.displayName = "SidebarHeadToggle";

export { SidebarHeadToggle };
