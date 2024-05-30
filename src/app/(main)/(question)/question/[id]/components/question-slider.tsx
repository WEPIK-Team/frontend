"use client";

import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Slider } from "@/components/ui/slider";

import useQuestion from "@/hooks/use-question";

import PrevNextBtns from "./prev-next-btns";

interface IQuestionSliderProps {}

interface IQuestionSlideerForm {
  BAR: number;
}

const QuestionSlider: React.FunctionComponent<IQuestionSliderProps> = () => {
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
  const form = useForm<IQuestionSlideerForm>({
    defaultValues: {
      BAR: parseInt(content) || 50,
    },
  });

  // function
  const onPrev = form.handleSubmit((data) => {
    updateQuestion(id, data.BAR.toString());
    prevQuestion();
  });

  const onNext = form.handleSubmit((data) => {
    console.log(data);
    if (index === maxLength) {
      console.log("Server Action");
    } else {
      updateQuestion(id, data.BAR.toString());
      nextQuestion();
    }
  });

  // const onNext: SubmitHandler<IQuestionSlideerForm> = async (data) => {

  // };

  return (
    <form onSubmit={onNext} className="w-full">
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
      <PrevNextBtns onPrev={onPrev} onNext={onNext} />
    </form>
  );
};

export default QuestionSlider;
