"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      showOutsideDays={showOutsideDays}
      classNames={{
        months: "flex flex-col ",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-wpt-md font-medium",
        nav: "space-x-1 flex items-center ",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent rounded-[100%] p-0 opacity-50 hover:opacity-100 border-none"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full justify-around",
        head_cell: "rounded-[100%] w-8 font-normal text-wpt-md text-wpc-gray",
        row: "flex w-full mt-2 w-full justify-around",
        cell: cn(
          "relative text-center flex-1 text-wpt-md focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-wpc-primary/20 [&:has([aria-selected].day-outside)]:bg-wpc-primary/50 [&:has([aria-selected].day-range-end)]:rounded-r-full",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-full [&:has(>.day-range-start)]:rounded-l-full first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full"
            : "[&:has([aria-selected])]:rounded-full "
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal  aria-selected:opacity-100 text-wpt-md"
        ),
        day_range_start: "day-range-start ",
        day_range_end: "day-range-end",
        day_selected:
          "bg-wpc-primary rounded-[100%] text-primary-foreground hover:bg-wpc-primary hover:text-primary-foreground focus:bg-wpc-primary focus:text-primary-foreground",
        day_today: "rounded-[100%] border border-wpc-primary",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-wpc-primary/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-transparent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className="h-5 w-5" />,
        IconRight: () => <ChevronRightIcon className="h-5 w-5" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
