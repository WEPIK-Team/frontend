"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

import QuestionDatePicker from "@/components/input/question-datepicker";
import QuestionInput from "@/components/input/question-input";
import QuestionRatingInput from "@/components/input/question-rating-input";
import QuestionSelect from "@/components/input/question-select";
import QuestionSlider from "@/components/input/question-slider";
import QuestionTextArea from "@/components/input/question-textarea";
import QuestionTitle from "@/components/question/question-title";

import useQuestion from "@/hooks/use-question";

import { QuestionType } from "@/types/question";

interface IQuestionProps {}

const variants = {
  enter: (direction: number) => {
    return {
      width: "0%",
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    width: "100%",
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      width: "0%",
      x: direction < 0 ? 800 : -800,
      opacity: 0,
    };
  },
};

const componentMap = {
  INPUT: QuestionInput,
  SELECT: QuestionSelect,
  STAR_RANK: QuestionRatingInput,
  TEXTAREA: QuestionTextArea,
  BAR: QuestionSlider,
  DATE: QuestionDatePicker,
};

const QuestionContent: React.FunctionComponent<{
  type: QuestionType | "";
}> = ({ type }) => {
  if (!type || !componentMap[type]) return null;

  const Component = componentMap[type];
  return <Component />;
};

const Question: React.FunctionComponent<IQuestionProps> = () => {
  // 값을 가져오지 못할 경우 에러 관리

  const { currentQuestion, currentQuestionIndex, previousQuestionIndex } =
    useQuestion();
  const { imageURL, title, type } = currentQuestion;

  const direction = currentQuestionIndex >= previousQuestionIndex ? 1 : -1;

  return (
    <div className={cn("mx-auto flex h-full w-full max-w-xl px-[16px] ")}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentQuestionIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.08 },
          }}
          className={cn(
            "relative flex w-full flex-col space-y-[20px] ",
            imageURL ? "pt-[80px]" : "justify-center pt-[100px]"
          )}
        >
          <div className="space-y-[12px] ">
            <QuestionTitle>{title}</QuestionTitle>
            {imageURL ? (
              <div className="relative mx-auto h-[230px] w-full rounded-[18px] md:h-[364px]">
                <Image
                  fill
                  alt="question-image"
                  src={imageURL}
                  priority
                  className="rounded-[18px] object-cover"
                />
              </div>
            ) : null}
          </div>
          <QuestionContent type={type} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Question;
