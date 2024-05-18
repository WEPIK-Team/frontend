import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  disabled: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-[18px] p-[1px] transition",
          disabled
            ? ""
            : "focus-within:bg-wpc-primary-grad hover:bg-wpc-primary-grad"
        )}
      >
        <textarea
          disabled={disabled}
          className={cn(
            "flex min-h-[200px] w-full rounded-[18px] border border-wpc-gray2 px-[18px] py-[17px] text-wpt-base-1 placeholder:text-wpc-gray focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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
