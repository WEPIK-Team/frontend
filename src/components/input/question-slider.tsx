"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import PrevNextBtns from "@/components/question/prev-next-btns";
import { Slider } from "@/components/ui/slider";

import useQuestion from "@/hooks/use-question";

interface IQuestionSliderProps {}

interface IQuestionSlideerForm {
  BAR: number;
}

const QuestionSlider: React.FunctionComponent<IQuestionSliderProps> = () => {
  // zustand
  const { currentQuestion } = useQuestion();
  const { content } = currentQuestion;

  // react hook form
  const form = useForm<IQuestionSlideerForm>({
    defaultValues: {
      BAR: parseInt(content) || 50,
    },
  });

  // const onNext: SubmitHandler<IQuestionSlideerForm> = async (data) => {

  // };

  return (
    <form className="my-[50px] w-full">
      <Controller
        name="BAR"
        {...form}
        render={({ field }) => {
          return (
            <Slider
              min={0}
              max={100}
              step={1}
              theme="receiver"
              value={[field.value]}
              onValueChange={(newValue) => {
                field.onChange(newValue[0]);
              }}
            />
          );
        }}
      />
      <PrevNextBtns form={form} type="BAR" />
    </form>
  );
};

export default QuestionSlider;
