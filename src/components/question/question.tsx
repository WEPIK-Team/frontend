"use client";
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

const QuestionContent: React.FunctionComponent<{
  type: QuestionType;
}> = ({ type }) => {
  switch (type) {
    case "INPUT":
      return <QuestionInput />;
    case "SELECT":
      return <QuestionSelect type="single" />;
    case "STAR_RANK":
      return <QuestionRatingInput />;
    case "TEXTAREA":
      return <QuestionTextArea />;
    case "BAR":
      return <QuestionSlider />;
    case "DATE":
      return <QuestionDatePicker />;
    default:
      return null;
  }
};

const Question: React.FunctionComponent<IQuestionProps> = () => {
  // 값을 가져오지 못할 경우 에러 관리

  const { currentQuestion } = useQuestion();
  const { imageURL, title, type } = currentQuestion;

  return (
    <div className="mx-auto flex h-full w-full max-w-xl flex-col items-center justify-center px-[16px]">
      <div
        className={cn(
          "relative mt-[40px] w-full  pb-[70px]",
          imageURL
            ? " h-full space-y-[24px]"
            : "flex min-h-[400px] flex-col gap-y-[20px]"
        )}
      >
        <QuestionTitle>{title}</QuestionTitle>
        {imageURL ? (
          <div
            style={{
              backgroundImage: `url(${imageURL})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="mx-auto h-[240px] w-full rounded-[18px] bg-auto"
          />
        ) : // <div className="mx-auto h-[240px] w-full rounded-[18px] bg-slate-800" />
        null}
        <QuestionContent type={type} />
      </div>
    </div>
  );
};

export default Question;
