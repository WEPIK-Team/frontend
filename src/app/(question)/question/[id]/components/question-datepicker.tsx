"use client";

import * as React from "react";
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ko } from "date-fns/locale";

export function QuestionDatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "flex w-full justify-between rounded-input-default border-[#676767] text-left font-normal shadow-sm",
              !date && "text-muted-foreground"
            )}
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "yyyy/MM/dd", { locale: ko })} -{" "}
                    {format(date.to, "yyyy/MM/dd", { locale: ko })}
                  </>
                ) : (
                  format(date.from, "yyyy/MM/dd")
                )
              ) : (
                <span>날짜를 선택하세요</span>
              )}
            </div>
            <ChevronDownIcon className="h-4 w-4 " />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[358px] rounded-[18px] p-0" align="center">
          <Calendar
            locale={ko}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            showOutsideDays={false}
            footer={
              <div className="mt-2 flex w-full justify-between">
                <Button
                  className="border border-primary text-primary"
                  size="calendar-footer"
                  variant="question"
                >
                  초기화
                </Button>
                <Button
                  className="bg-primary text-white"
                  size="calendar-footer"
                  variant="question"
                >
                  완료
                </Button>
              </div>
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
