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
import { Textarea } from "@/components/ui/textarea";

import useQuestion from "@/hooks/use-question";

import PrevNextBtns from "./prev-next-btns";
import QuestionTextCounter from "./question-text-counter";

interface IQuestionTextAreaProps {}

// form validation
const FormSchema = z.object({
  TEXTAREA: z
    .string()
    .min(10, { message: "10자 이상 입력해야 합니다." })
    .max(300, { message: "300자 까지 입력할 수 있습니다." }),
});

const QuestionTextArea: React.FunctionComponent<
  IQuestionTextAreaProps
> = () => {
  // zustand
  const {
    maxLength,
    currentQuestion,
    currentQuestionIndex: index,
    prevQuestion,
    nextQuestion,
    updateQuestion,
  } = useQuestion();

  const { id, content } = currentQuestion;

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "all",
    defaultValues: {
      TEXTAREA: content,
    },
  });
  const textAreaLength = form.watch("TEXTAREA").length || 0;

  // function
  const onPrev = form.handleSubmit((data) => {
    updateQuestion(id, data.TEXTAREA);
    prevQuestion();
  });

  const onNext = form.handleSubmit((data) => {
    console.log(data);

    if (index === maxLength) {
      console.log("Server Action");
    } else {
      updateQuestion(id, data.TEXTAREA);
      nextQuestion();
    }
  });

  // const onNext = (data: z.infer<typeof FormSchema>) => {

  // };

  return (
    <Form {...form}>
      <form onSubmit={onNext}>
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
        <PrevNextBtns
          onPrev={onPrev}
          onNext={onNext}
          isMax={index === maxLength}
        />
      </form>
    </Form>
  );
};

export default QuestionTextArea;
