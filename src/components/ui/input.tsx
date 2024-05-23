import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full rounded-[18px] border border-wpc-gray2 px-[18px] py-[17px] text-wpt-base-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-wpc-gray focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "focus:border-wpc-gray",
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
      {
        variant: "grad",
        readOnly: true,
        className: "focus:border-wpc-gray2",
      },
    ],
  }
);

type InputVariantProps = VariantProps<typeof inputVariants>;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputVariantProps {
  readOnly?: boolean;
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, variant, readOnly, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            inputVariants({ variant, className, isError, readOnly })
          )}
          ref={ref}
          readOnly={readOnly}
          {...props}
        />
        {isError ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
            <Image
              src="/svgs/input-error.svg"
              width={24}
              height={24}
              alt="back"
            />
          </div>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
