"use cllient";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import useQuestion from "@/hooks/use-question";

import RatingInput from "./rating-input";
import PrevNextBtns from "../question/prev-next-btns";

interface IQuestionRatingInputProps {}

// form validation
const FormSchema = z.object({
  STAR_RANK: z.string().min(1, { message: "별점을 선택해 주세요" }),
});

type FormSchemeType = z.infer<typeof FormSchema>;

const QuestionRatingInput: React.FunctionComponent<
  IQuestionRatingInputProps
> = () => {
  // zustand
  const { currentQuestion } = useQuestion();
  const { content } = currentQuestion;

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      STAR_RANK: content === "0" ? "0" : content ? content : "2.5",
    },
  });

  // const onNext = (data: z.infer<typeof FormSchema>) => {

  // };

  return (
    <Form {...form}>
      <form className="w-full">
        <FormField
          control={form.control}
          name="STAR_RANK"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="mx-auto w-full">
                  <RatingInput
                    id={10}
                    size={56}
                    emptyColor="#DBDADE"
                    theme="sender"
                    value={parseFloat(field.value)}
                    onRateChange={(value) => {
                      field.onChange(value.toString());
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <PrevNextBtns<FormSchemeType> type="STAR_RANK" form={form} />
      </form>
    </Form>
  );
};

export default QuestionRatingInput;
