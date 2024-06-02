"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
    .string()
    .min(1, { message: "내용을 작성해 주세요" })
    .min(10, { message: "10자 이상 입력해야 합니다." })
    .max(300, { message: "300자 까지 입력할 수 있습니다." }),
});

type FormSchemeType = z.infer<typeof FormSchema>;

const QuestionTextArea: React.FunctionComponent<
  IQuestionTextAreaProps
> = () => {
  // zustand
  const { currentQuestion } = useQuestion();
  const { content } = currentQuestion;

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "all",
    defaultValues: {
      TEXTAREA: content,
    },
  });
  const textAreaLength = form.watch("TEXTAREA")?.length || 0;

  return (
    <Form {...form}>
      <form className="w-full">
        <FormField
          control={form.control}
          name="TEXTAREA"
          render={({ field, formState }) => {
            return (
              <FormItem>
                <FormControl>
                  <Textarea
                    variant="grad"
                    maxLength={300}
                    isError={!formState.isValid}
                    placeholder="답변을 입력하세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <QuestionTextCounter max={300} current={textAreaLength} />
        <PrevNextBtns<FormSchemeType> type="TEXTAREA" form={form} />
      </form>
    </Form>
  );
};

export default QuestionTextArea;
