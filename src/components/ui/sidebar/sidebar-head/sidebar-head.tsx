import { cva } from "class-variance-authority";
import { ComponentPropsWithRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

import { SidebarHeadTitle } from "./sidebar-head-title";
import { SidebarHeadToggle } from "./sidebar-head-toggle";
import { useSidebarContext } from "../sidebar-context";

const head = cva([
  "transition-opacity",
  "w-full",
  "items-center",
  "pb-[16px]",
  "px-5",
  "bg-inherit",
  "flex",
  "flex-nowrap",
  "justify-between",
]);

export interface SidebarHeadProps extends ComponentPropsWithRef<"div"> {}

const SidebarHeadRoot = forwardRef<HTMLDivElement, SidebarHeadProps>(
  ({ children, className, ...props }, ref) => {
    const { expanded, hovered } = useSidebarContext();

    return (
      <>
        {(expanded || hovered) && (
          <div ref={ref} className={cn(head({}), className)} {...props}>
            {children}
          </div>
        )}
      </>
    );
  }
);
SidebarHeadRoot.displayName = "SidebarHead";

const SidebarHead = Object.assign(SidebarHeadRoot, {
  Title: SidebarHeadTitle,
  Toggle: SidebarHeadToggle,
});

export { SidebarHead };
