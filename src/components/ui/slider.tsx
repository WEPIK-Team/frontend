"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";

import SpeechBubble from "@/app/(main)/(question)/question/[id]/components/speech-bubble";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  theme: "sender" | "receiver" | "default";
}

const ThemeObj = {
  sender: "bg-wpc-second-grad",
  receiver: "bg-wpc-primary-grad",
  default: "bg-wpc-gray",
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, theme = "default", ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[12px] w-full grow overflow-hidden rounded-full bg-wpc-gray2">
      <SliderPrimitive.Range
        className={cn("absolute h-full", ThemeObj[theme] || "bg-wpc-gray")}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="relative block h-[28px] w-[28px] rounded-full bg-background shadow-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wpc-primary disabled:pointer-events-none disabled:opacity-50">
      <SpeechBubble className="absolute -left-[20px] -top-[50px]">
        {props.value}%
      </SpeechBubble>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
