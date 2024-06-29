"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";

import SpeechBubble from "@/components/question/speech-bubble";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  theme: "sender" | "receiver" | "default";
  readOnly?: boolean;
}

const ThemeObj = {
  bg: {
    sender: "bg-wpc-second-grad",
    receiver: "bg-wpc-main2-grad",
    default: "bg-wpc-primary-grad",
  },
  textColor: {
    sender: "text-wpc-primary",
    receiver: "text-wpc-second",
    default: "text-wpc-gray",
  },
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, theme = "default", readOnly, ...props }, ref) => (
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
        className={cn("absolute h-full", ThemeObj.bg[theme] || "bg-wpc-gray")}
      />
    </SliderPrimitive.Track>
    {readOnly ? (
      <>
        <span
          className={cn(
            " ml-[10px] text-wpt-base-1 font-semibold",
            ThemeObj.textColor[theme]
          )}
        >
          {props.value}%
        </span>
        <SliderPrimitive.Thumb
          className={cn(
            "relative mr-10 block h-[28px] w-[28px] rounded-full bg-background shadow-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wpc-primary disabled:pointer-events-none disabled:opacity-50"
          )}
        ></SliderPrimitive.Thumb>
      </>
    ) : (
      <SliderPrimitive.Thumb
        className={cn(
          "relative block h-[28px] w-[28px] rounded-full bg-background shadow-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wpc-primary disabled:pointer-events-none disabled:opacity-50"
        )}
      >
        <SpeechBubble className="absolute -left-[20px] -top-[50px]">
          {props.value}%
        </SpeechBubble>
      </SliderPrimitive.Thumb>
    )}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
