"use client";

import { motion } from "framer-motion";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import PrevNextBtns from "@/components/question/prev-next-btns";
import { Slider } from "@/components/ui/slider";

import useQuestion from "@/hooks/use-question";

import QuestionFormWrapper from "../question/question-form-wrapper";

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
    <QuestionFormWrapper>
      <div
        className={cn(
          "relative mt-12 flex w-full flex-col space-y-2 ",
          currentQuestion.imageURL
            ? "flex-grow py-8 "
            : "items-center justify-start "
        )}
      >
        <motion.div
          initial={{
            width: 0,
            opacity: 0,
          }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute left-0"
        >
          <Slider
            min={0}
            max={100}
            step={1}
            theme="default"
            value={[sliderValue]}
            onValueChange={(newValue) => {
              setSliderValue(newValue[0]);
              form.setValue("BAR", newValue[0]);
            }}
          />
        </motion.div>
      </div>
      <PrevNextBtns form={form} type="BAR" />
    </QuestionFormWrapper>
  );
};

export default QuestionSlider;
