import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-[18px] p-[1px] transition",
          disabled
            ? ""
            : "focus-within:bg-wpc-primary-grad hover:bg-wpc-primary-grad"
        )}
      >
        <input
          type={type}
          disabled={disabled}
          className={cn(
            "w-full rounded-[18px] border border-wpc-gray2 px-[18px] py-[17px] text-wpt-base-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-wpc-gray focus:border-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
            disabled ? "" : "hover:border-transparent"
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
