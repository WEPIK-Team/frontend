"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-[24px] w-[24px] shrink-0 focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ",
        className
      )}
      {...props}
    >
      <Image
        src={
          props.checked ? "/svgs/sender-check.svg" : "/svgs/disabled-check.svg"
        }
        width={24}
        height={24}
        alt={props.checked ? "checked" : "Not checked"}
      />
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
