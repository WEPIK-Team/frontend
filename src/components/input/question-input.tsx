"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const { content } = currentQuestion;

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onTouched",
    defaultValues: {
      INPUT: content || "",
    },
  });

  const inputLength = form.watch("INPUT").length || 0;

  return (
    <Form {...form}>
      <form className="w-full space-y-2">
        <FormField
          control={form.control}
          name="INPUT"
          render={({ field, formState }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    isError={!!formState.errors.INPUT?.message || false}
                    variant="grad"
                    {...field}
                    placeholder="답변을 입력하세요"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <QuestionTextCounter max={50} current={inputLength} />
      </form>
      <PrevNextBtns<FormSchemeType> type="INPUT" form={form} />
    </Form>
  );
};

export default QuestionInput;
