"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { addDays } from "date-fns";
import { ko } from "date-fns/locale";
import { motion } from "framer-motion";
import * as React from "react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import PrevNextBtns from "@/components/question/prev-next-btns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useQuestion from "@/hooks/use-question";
import { formatDateforKor } from "@/lib/question";

import QuestionFormWrapper from "../question/question-form-wrapper";

// form validation
const FormSchema = z.object({
  DATE: z.object({
    from: z.date({
      required_error: "날짜를 선택해 주세요",
      invalid_type_error: "유효한 날짜가 아닙니다.",
    }),
    to: z.date().optional(),
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export const QuestionDatePicker = () => {
  // zustand
  const { currentQuestion } = useQuestion();
  const { content, id } = currentQuestion;

  // Ensure content is a string and split it
  let startDateString = undefined;
  let endDateString = undefined;

  if (typeof content === "string" && content.includes(" - ")) {
    [startDateString, endDateString] = content.split(" - ");
  } else if (typeof content === "string" && content.length > 0) {
    [startDateString, endDateString] = [content, undefined];
  }

  const from = startDateString ? new Date(startDateString) : undefined;
  const to = endDateString ? new Date(endDateString) : undefined;

  // state
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from,
    to,
  });

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    let newFrom = undefined;
    let newTo = undefined;

    if (typeof content === "string" && content.includes(" - ")) {
      [newFrom, newTo] = content.split(" - ").map((date) => new Date(date));
    } else if (typeof content === "string" && content.length > 0) {
      [newFrom, newTo] = [new Date(content), undefined];
    }

    setDateRange({ from: newFrom, to: newTo });
    form.reset({ DATE: { from: newFrom, to: newTo } });
  }, [content, form, id]);

  // function
  const handleInit = () => {
    const defaultFrom = new Date();
    const defaultTo = addDays(defaultFrom, 1);
    setDateRange({ from: defaultFrom, to: defaultTo });
    form.setValue("DATE", {
      from: defaultFrom,
      to: defaultTo,
    });
    setIsOpen(false);
  };

  const isOnlyFirst = dateRange?.from && dateRange.to ? false : true;

  return (
    <Form {...form}>
      <QuestionFormWrapper>
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            "flex w-full flex-col  space-y-2",
            currentQuestion.imageURL
              ? "flex-grow py-8 "
              : "items-center justify-center"
          )}
        >
          <FormField
            control={form.control}
            name="DATE"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
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
                            {dateRange?.from ? (
                              dateRange.to ? (
                                <>
                                  {formatDateforKor(dateRange.from)} -{" "}
                                  {formatDateforKor(dateRange.to)}
                                </>
                              ) : (
                                formatDateforKor(dateRange.from)
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
                        defaultMonth={dateRange?.to}
                        selected={dateRange}
                        onSelect={(range) => {
                          setDateRange(range);
                          field.onChange(range);
                        }}
                        isOnlyFirst={isOnlyFirst}
                        numberOfMonths={1}
                        showOutsideDays={false}
                        className="max-h-[350px] overflow-y-auto overflow-x-hidden"
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
                  <p className="text-right text-wpt-sm text-wpc-error">
                    {form?.formState?.errors?.DATE?.from?.message}
                  </p>
                </FormItem>
              );
            }}
          />
        </motion.form>
        <PrevNextBtns<FormSchemaType> form={form} type="DATE" />
      </QuestionFormWrapper>
    </Form>
  );
};

export default QuestionDatePicker;
