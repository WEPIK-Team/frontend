"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import RatingInput from "@/components/input/rating-input";
import PrevNextBtns from "@/components/question/prev-next-btns";
import QuestionFormWrapper from "@/components/question/question-form-wrapper";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import useQuestion from "@/hooks/use-question";
import { calRatingComment } from "@/lib/question";

interface IQuestionRatingInputProps {}

// form validation
const FormSchema = z.object({
  STAR_RANK: z.string().min(1, { message: "별점을 선택해 주세요" }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const QuestionRatingInput: React.FunctionComponent<
  IQuestionRatingInputProps
> = () => {
  // zustand
  const { currentQuestion } = useQuestion();
  const { content, id } = currentQuestion;

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      STAR_RANK: content === "0" ? "0" : content ? content : "2.5",
    },
  });

  const [ratingValue, setRatingValue] = useState(parseFloat(content) || 2.5);

  useEffect(() => {
    const newValue = parseFloat(content) || 0;
    setRatingValue(newValue);
    form.reset({ STAR_RANK: newValue.toString() });
  }, [content, form, id]);

  return (
    <Form {...form}>
      <QuestionFormWrapper>
        <motion.form
          className={cn(
            "mt-4 flex w-full flex-col space-y-2",
            currentQuestion.imageURL
              ? "flex-grow py-8 "
              : "items-center justify-center"
          )}
        >
          <FormField
            control={form.control}
            name="STAR_RANK"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="mx-auto w-fit">
                    <RatingInput
                      id={10}
                      size={56}
                      emptyColor="#DBDADE"
                      theme="sender"
                      value={ratingValue}
                      onRateChange={(value) => {
                        setRatingValue(value);
                        field.onChange(value.toString());
                      }}
                    />
                  </div>
                  <FormMessage />
                  <div className="flex items-center justify-center gap-x-2 text-wpt-md  ">
                    <p className="font-semibold text-wpc-primary">
                      {ratingValue}
                    </p>
                    <p className="text-wpc-gray">{`(${calRatingComment(ratingValue)})`}</p>
                  </div>
                </FormItem>
              );
            }}
          />
        </motion.form>
        <PrevNextBtns<FormSchemaType> type="STAR_RANK" form={form} />
      </QuestionFormWrapper>
    </Form>
  );
};

export default QuestionRatingInput;
