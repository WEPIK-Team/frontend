import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isError?: boolean;
  isGrad?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isError, isGrad, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[200px] w-full rounded-[18px] border border-wpc-gray2 px-[18px] py-[17px] text-wpt-base-1 placeholder:text-wpc-gray focus-visible:right-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            isError ? "border border-wpc-error " : "border-wpc-gray2",
            isGrad && !isError && "input-border-gradient",
            !isGrad && !isError && "focus:border-wpc-gray",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
