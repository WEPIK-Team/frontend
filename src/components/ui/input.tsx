import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  isGrad?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, isGrad, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "w-full rounded-[18px] border px-[18px] py-[17px] text-wpt-base-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-wpc-gray focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
            isError
              ? "border border-wpc-error bg-wpc-light-error"
              : "border-wpc-gray2",
            isGrad && !isError && "input-border-gradient",
            !isGrad && !isError && "focus:border-wpc-gray",
            className
          )}
          ref={ref}
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
