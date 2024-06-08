"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { addDays } from "date-fns";
import { ko } from "date-fns/locale";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useQuestion from "@/hooks/use-question";

import PrevNextBtns, { formatDateforKor } from "../question/prev-next-btns";

// form validation
const FormSchema = z.object({
  DATE: z.object(
    {
      from: z.date(),
      to: z.date().optional(),
    },
    { required_error: "날짜를 선택해 주세요" }
  ),
});

type FormSchemeType = z.infer<typeof FormSchema>;

export const QuestionDatePicker = () => {
  // zustand
  const { currentQuestion } = useQuestion();
  const { content } = currentQuestion;
  const [startDateString, endDateString] = content
    ? content.split(" - ")
    : [new Date(), new Date()];

  const from = startDateString ? new Date(startDateString) : new Date();
  const to = endDateString ? new Date(endDateString) : undefined;

  // State
  const [isOpen, setIsOpen] = React.useState(false);

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      DATE: {
        from: from,
        to: to,
      },
    },
  });

  // function
  const handleInit = () => {
    const defaultFrom = new Date();
    const defaultTo = addDays(defaultFrom, 1);
    form.setValue("DATE", {
      from: defaultFrom,
      to: defaultTo,
    });
    setIsOpen(false);
  };

  return (
    <Form {...form}>
      <form className="grid w-full gap-2">
        <FormField
          control={form.control}
          name="DATE"
          render={({ field }) => {
            return (
              <FormItem>
                <Popover
                  open={isOpen}
                  onOpenChange={(isOpen) => {
                    setIsOpen(isOpen);
                  }}
                >
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      className={cn(
                        "h-[56px] w-full rounded-[14px] bg-transparent p-0 text-left text-wpt-base-1 font-semibold",
                        !field.value && "text-muted-foreground",
                        isOpen
                          ? "div-border-gradient"
                          : "border border-wpc-gray2"
                      )}
                    >
                      <div className="flex w-full justify-between px-[15px] pb-[16px] pt-[15px]">
                        <div className="flex items-center gap-x-[13px] ">
                          <CalendarIcon
                            className={cn(
                              "mr-2 h-[26px] w-[26px] text-wpc-primary"
                            )}
                          />
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {formatDateforKor(field.value.from)} -{" "}
                                {formatDateforKor(field.value.to)}
                              </>
                            ) : (
                              formatDateforKor(field.value.from)
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
                      defaultMonth={form.getValues("DATE")?.to}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={1}
                      showOutsideDays={false}
                      className="max-h-[350px] overflow-y-scroll"
                      footer={
                        <div className=" flex w-full justify-between">
                          <Button
                            type="button"
                            onClick={handleInit}
                            className="h-[44px] rounded-full border border-wpc-gray3 bg-transparent px-[20px] py-[10px] text-wpt-md font-normal text-wpc-primary hover:bg-transparent"
                          >
                            초기화
                          </Button>
                          <Button
                            type="button"
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
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <PrevNextBtns<FormSchemeType> form={form} type="DATE" />
      </form>
    </Form>
  );
};

export default QuestionDatePicker;
