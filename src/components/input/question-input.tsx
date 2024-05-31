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

// form validation
// 1글자만 적을 경우 에러 메세지가 나오지 않음
const FormSchema = z.object({
  INPUT: z
    .string()
    .min(2, { message: "2자 이상 입력해야 합니다." })
    .max(50, { message: "50자 까지 입력할 수 있습니다." }),
});

const QuestionInput: React.FunctionComponent<IQuestionInputProps> = () => {
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

  // react hook form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      INPUT: content || "",
    },
  });

  const inputLength = form.watch("INPUT").length || 0;

  // function
  const onPrev = form.handleSubmit((data) => {
    updateQuestion(id, data.INPUT);
    prevQuestion();
  });

  const onNext = form.handleSubmit((data) => {
    console.log(data);

    if (index === maxLength) {
      console.log("Server Action");
    } else {
      updateQuestion(id, data.INPUT);
      nextQuestion();
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onNext}>
        <FormField
          control={form.control}
          name="INPUT"
          render={({ field, formState }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    isError={!formState.isValid}
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
        <PrevNextBtns
          onPrev={onPrev}
          onNext={onNext}
          isMax={index === maxLength}
        />
      </form>
    </Form>
  );
};

export default QuestionInput;
