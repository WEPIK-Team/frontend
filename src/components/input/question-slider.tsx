"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import PrevNextBtns from "@/components/question/prev-next-btns";
import { Slider } from "@/components/ui/slider";

import useQuestion from "@/hooks/use-question";

interface IQuestionSliderProps {}

interface IQuestionSliderForm {
  BAR: number;
}

const QuestionSlider: React.FunctionComponent<IQuestionSliderProps> = () => {
  // zustand
  const { currentQuestion } = useQuestion();
  const { content, id } = currentQuestion;

  // react hook form
  const form = useForm<IQuestionSliderForm>({});
  const [sliderValue, setSliderValue] = useState(parseInt(content) || 0);

  useEffect(() => {
    const newValue = parseInt(content) || 0;
    setSliderValue(newValue);
    form.reset({ BAR: newValue });
  }, [content, form, id]);

  return (
    <form className="my-[50px] w-full">
      <div>
        <Slider
          min={0}
          max={100}
          step={1}
          theme="receiver"
          value={[sliderValue]}
          onValueChange={(newValue) => {
            setSliderValue(newValue[0]);
            form.setValue("BAR", newValue[0]);
          }}
        />
      </div>
      <PrevNextBtns form={form} type="BAR" />
    </form>
  );
};

export default QuestionSlider;
