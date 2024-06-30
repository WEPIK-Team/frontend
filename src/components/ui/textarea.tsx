import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const textAreaVariants = cva(
  "flex min-h-[100px] w-full rounded-[18px] border border-wpc-gray2 px-[18px] py-[17px] text-wpt-base-1 placeholder:text-wpc-gray focus-visible:right-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-wpc-gray2 focus:border-wpc-gray",
        grad: "input-border-gradient ",
      },
      readOnly: {
        true: "",
      },
      isError: {
        true: "border border-wpc-error bg-wpc-light-error focus:border-wpc-error",
      },
    },

    defaultVariants: {
      variant: "default",
    },
    compoundVariants: [
      {
        variant: "default",
        readOnly: true,
        className: "focus:border-wpc-gray2",
      },
      {
        readOnly: true,
        isError: true,
        className: "focus:border-wpc-error",
      },
    ],
  }
);

type TextAreaVariantProps = VariantProps<typeof textAreaVariants>;

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextAreaVariantProps {
  readOnly?: boolean;
  isError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isError, variant, readOnly, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          textAreaVariants({ variant, className, isError, readOnly })
        )}
        readOnly={readOnly}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
