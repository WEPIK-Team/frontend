"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import useQuestion from "@/hooks/use-question";

import PrevNextBtns from "../question/prev-next-btns";
import QuestionFormWrapper from "../question/question-form-wrapper";
import QuestionTextCounter from "../question/question-text-counter";

interface IQuestionInputProps {}

const FormSchema = z.object({
  INPUT: z
    .string({
      required_error: "내용을 작성해야 합니다.",
    })
    .min(2, { message: "2자 이상 입력해야 합니다." })
    .max(50, { message: "50자 까지 입력할 수 있습니다." }),
});
type FormSchemeType = z.infer<typeof FormSchema>;

const QuestionInput: React.FunctionComponent<IQuestionInputProps> = () => {
  // zustand
  const { currentQuestion } = useQuestion();
  const { content, id } = currentQuestion;

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onTouched",
    defaultValues: {
      INPUT: content || "",
    },
  });

  const inputLength = form.watch("INPUT").length || 0;
  const [inputValue, setInputValue] = useState(content || "");

  useEffect(() => {
    setInputValue(content || "");
    form.reset({ INPUT: content || "" });
  }, [content, form, id]);

  return (
    <Form {...form}>
      <QuestionFormWrapper>
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={cn(
            "flex w-full flex-col space-y-2",
            currentQuestion.imageURL
              ? "flex-grow pt-8"
              : "items-center justify-center "
          )}
        >
          <FormField
            control={form.control}
            name="INPUT"
            render={({ field, formState }) => {
              return (
                <FormItem className="relative w-full">
                  <FormControl>
                    <Input
                      isError={!!formState.errors.INPUT?.message || false}
                      variant="grad"
                      {...field}
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        field.onChange(e);
                      }}
                      placeholder="답변을 입력하세요"
                      type="text"
                      inputMode="text"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                  <QuestionTextCounter max={50} current={inputLength} />
                </FormItem>
              );
            }}
          />
        </motion.form>
        <PrevNextBtns<FormSchemeType> type="INPUT" form={form} />
      </QuestionFormWrapper>
    </Form>
  );
};

export default QuestionInput;
