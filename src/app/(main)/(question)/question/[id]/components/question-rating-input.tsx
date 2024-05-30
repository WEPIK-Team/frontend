import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import useQuestion from "@/hooks/use-question";

import PrevNextBtns from "./prev-next-btns";
import RatingInput from "./rating-input";

interface IQuestionRatingInputProps {}

// form validation
const FormSchema = z.object({
  STARRATE: z.string().min(1, { message: "별점을 선택해 주세요" }),
});

const QuestionRatingInput: React.FunctionComponent<
  IQuestionRatingInputProps
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
    defaultValues: {
      STARRATE: content || "2.5",
    },
  });

  // function
  const onPrev = form.handleSubmit((data) => {
    console.log(data);

    updateQuestion(id, data.STARRATE.toString());
    prevQuestion();
  });

  const onNext = form.handleSubmit((data) => {
    console.log(data);

    if (index === maxLength) {
      console.log("Server Action");
    } else {
      updateQuestion(id, data.STARRATE);
      nextQuestion();
    }
  });

  // const onNext = (data: z.infer<typeof FormSchema>) => {

  // };

  return (
    <Form {...form}>
      <form onSubmit={onNext} className="w-full">
        <FormField
          control={form.control}
          name="STARRATE"
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
        <PrevNextBtns
          onPrev={onPrev}
          onNext={onNext}
          isMax={index === maxLength}
        />
      </form>
    </Form>
  );
};

export default QuestionRatingInput;
