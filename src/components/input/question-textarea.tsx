"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import PrevNextBtns from "@/components/question/prev-next-btns";
import QuestionTextCounter from "@/components/question/question-text-counter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import useQuestion from "@/hooks/use-question";

interface IQuestionTextAreaProps {}

// form validation
const FormSchema = z.object({
  TEXTAREA: z
    .string({
      required_error: "내용을 작성해 주세요",
    })
    .min(10, { message: "10자 이상 입력해야 합니다." })
    .max(300, { message: "300자 까지 입력할 수 있습니다." }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const QuestionTextArea: React.FunctionComponent<
  IQuestionTextAreaProps
> = () => {
  // zustand
  const { currentQuestion } = useQuestion();
  const { content, id } = currentQuestion;

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onTouched",
  });

  const [textareaValue, setTextareaValue] = useState(content);

  useEffect(() => {
    setTextareaValue(content);
    form.reset({ TEXTAREA: content });
  }, [content, form, id]);

  const error = form.formState.errors.TEXTAREA;
  const textAreaLength = form.watch("TEXTAREA")?.length || 0;

  return (
    <Form {...form}>
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full space-y-2"
      >
        <FormField
          control={form.control}
          name="TEXTAREA"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  value={textareaValue}
                  onChange={(e) => {
                    setTextareaValue(e.target.value);
                    field.onChange(e);
                  }}
                  variant="grad"
                  maxLength={300}
                  isError={!!error || false}
                  placeholder="답변을 입력하세요"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <QuestionTextCounter max={300} current={textAreaLength} />
      </motion.form>
      <PrevNextBtns<FormSchemaType> type="TEXTAREA" form={form} />
    </Form>
  );
};

export default QuestionTextArea;
