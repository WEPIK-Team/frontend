"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";
import SpeechBubble from "../../app/(question)/question/[id]/components/speech-bubble";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[12px] w-full grow overflow-hidden rounded-full bg-[#D9D9D9]">
      <SliderPrimitive.Range className="absolute h-full bg-wpc-primary-grad" />
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
