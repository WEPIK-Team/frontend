import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[30px] text-wpt-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-wpc-second-grad text-white",
        gray: "bg-wpc-light-gray text-wpc-gray",
      },
      size: {
        default: "h-[60px] px-4 py-2",
      },
      disabled: {
        true: "",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },

    compoundVariants: [
      {
        variant: "default",
        disabled: true,
        className: "bg-wpc-gray2 cursor-not-allowed shadow-none",
      },
      {
        variant: "default",
        disabled: false,
        className: "bg-wpc-gray2 cursor-not-allowed shadow-wps-primary",
      },
      {
        variant: "gray",
        disabled: true,
        className: "cursor-not-allowed shadow-none",
      },
    ],
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    ButtonVariantProps {
  asChild?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        {...props}
        disabled={disabled}
        className={cn(buttonVariants({ variant, size, disabled, className }))}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
