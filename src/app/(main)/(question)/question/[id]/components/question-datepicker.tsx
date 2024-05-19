"use client";
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IQuestionDatePickerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disabled: boolean;
}

function QuestionDatePicker({ className, disabled }: IQuestionDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);
        }}
      >
        <PopoverTrigger asChild>
          <div
            className={cn(
              "overflow-hidden rounded-[18px] p-[2px] transition ",
              disabled ? "" : "hover:bg-wpc-primary-grad",
              isOpen && "bg-wpc-primary-grad"
            )}
          >
            <Button
              id="date"
              variant="outline"
              className={cn(
                "flex h-[56px] w-full justify-between rounded-[14px] border-wpc-gray px-[15px] pb-[16px] pt-[15px] text-left text-wpt-base-1 font-semibold shadow-sm hover:border-transparent hover:bg-white focus:outline-none ",
                !date && "text-muted-foreground",
                isOpen && "border-transparent"
              )}
            >
              <div className="flex items-center gap-x-[13px]">
                <CalendarIcon className="mr-2 h-[26px] w-[26px] text-wpc-primary" />
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
              <ChevronDownIcon className="h-[26px] w-[26px] font-bold text-wpc-primary" />
            </Button>
          </div>
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
              <div className="mt-[25px] flex w-full justify-between">
                <Button className="rounded-full border border-wpc-gray3 bg-transparent p-[20px] text-wpt-md font-normal text-wpc-primary hover:bg-transparent">
                  초기화
                </Button>
                <Button className="rounded-full bg-wpc-second-grad p-[20px] text-wpt-md font-normal text-white ">
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

export default QuestionDatePicker;
