"use client";

import { cva } from "class-variance-authority";
import {
  ComponentPropsWithRef,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";

import { cn } from "@/lib/utils";

import { useSidebarContext } from "./sidebar-context";

const hrVariants = cva("mx-[10px] my-2 border-t-[0.5px] border-wpc-gray", {
  variants: {
    opened: {
      true: [""],
      false: ["hidden"],
    },
  },
});

interface SidebarSeparatorProps extends ComponentPropsWithRef<"hr"> {}

type SidebarSeparatorComponent = ForwardRefExoticComponent<
  PropsWithoutRef<SidebarSeparatorProps> & RefAttributes<HTMLHRElement>
> & {
  displayName?: string;
};

const SidebarSeparator: SidebarSeparatorComponent = forwardRef<
  HTMLHRElement,
  SidebarSeparatorProps
>((props: SidebarSeparatorProps, ref) => {
  const { className, ...additionalProps } = props;
  const { expanded, hovered } = useSidebarContext();
  const opened = expanded || hovered;

  return (
    <hr
      className={cn(hrVariants({ opened }), className)}
      ref={ref}
      {...additionalProps}
    />
  );
}) as SidebarSeparatorComponent;

SidebarSeparator.displayName = "SidebarSeparator";

export { SidebarSeparator };
