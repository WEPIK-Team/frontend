"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
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

import PrevNextBtns from "./prev-next-btns";

// form validation
const FormSchema = z.object({
  DATE: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    { required_error: "날짜를 선택해 주세요" }
  ),
});

export const QuestionDatePicker = () => {
  // zustand
  const {
    maxLength,
    currentQuestion,
    currentQuestionIndex: index,
    nextQuestion,
    prevQuestion,
    updateQuestion,
  } = useQuestion();
  const { id, content } = currentQuestion;

  const [startDateString, endDateString] = content.split(" - ");
  const from = new Date(startDateString);
  const to = new Date(endDateString);

  // State
  const [isOpen, setIsOpen] = React.useState(false);

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      DATE: {
        from: from || new Date(),
        to: to || addDays(new Date(from || new Date()), 1),
      },
    },
  });

  // function
  const onInit = () => {
    const defaultFrom = new Date();
    const defaultTo = addDays(defaultFrom, 1);
    form.setValue("DATE", {
      from: defaultFrom,
      to: defaultTo,
    });
  };

  const onPrev = form.handleSubmit((data) => {
    if (data.DATE.from && data.DATE.to) {
      updateQuestion(
        id,
        `${format(data.DATE.from, "yyyy/MM/dd")} - ${format(data.DATE.to, "yyyy/MM/dd")}`
      );
      prevQuestion();
    }
  });

  const onNext = form.handleSubmit((data) => {
    console.log(data);
    if (index === maxLength) {
      console.log("Server Action");
    } else {
      updateQuestion(
        id,
        `${format(data.DATE.from, "yyyy/MM/dd")} - ${format(data.DATE.to, "yyyy/MM/dd")}`
      );
      nextQuestion();
    }
  });

  // const onNext = (data: z.infer<typeof FormSchema>) => {

  // };

  return (
    <Form {...form}>
      <form onSubmit={onNext} className="grid w-full gap-2">
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
                                {format(field.value.from, "yyyy/MM/dd", {
                                  locale: ko,
                                })}{" "}
                                -{" "}
                                {format(field.value.to, "yyyy/MM/dd", {
                                  locale: ko,
                                })}
                              </>
                            ) : (
                              format(field.value.from, "yyyy/MM/dd", {
                                locale: ko,
                              })
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
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={1}
                      showOutsideDays={false}
                      footer={
                        <div className="mt-2 flex w-full justify-between">
                          <Button
                            type="button"
                            onClick={onInit}
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
        <PrevNextBtns
          onPrev={onPrev}
          onNext={onNext}
          isMax={index === maxLength}
        />
      </form>
    </Form>
  );
};

export default QuestionDatePicker;
