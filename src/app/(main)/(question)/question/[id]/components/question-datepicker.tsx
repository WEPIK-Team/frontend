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
  extends React.HTMLAttributes<HTMLDivElement> {}

function QuestionDatePicker({ className }: IQuestionDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover
        open={isOpen}
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            disabled
            id="date"
            className={cn(
              " h-[56px] w-full rounded-[14px] bg-transparent p-0 text-left text-wpt-base-1 font-semibold",
              !date && "text-muted-foreground",
              isOpen ? "div-border-gradient" : "border border-wpc-gray2"
            )}
          >
            <div className="flex w-full justify-between px-[15px] pb-[16px] pt-[15px]">
              <div className="flex items-center gap-x-[13px] ">
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
              <ChevronDownIcon
                className={cn(
                  "h-[26px] w-[26px] font-bold text-wpc-primary transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-[70] w-[358px] rounded-[18px] p-0"
          align="center"
        >
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
                <Button className="h-[44px] rounded-full border border-wpc-gray3 bg-transparent px-[20px] py-[10px] text-wpt-md font-normal text-wpc-primary hover:bg-transparent">
                  초기화
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="font-normaltext-white h-[44px] rounded-full bg-wpc-second-grad px-[20px] py-[10px] text-wpt-md text-white "
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

export default QuestionDatePicker;
