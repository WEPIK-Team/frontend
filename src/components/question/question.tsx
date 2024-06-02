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

import { QuestionTypeTest } from "@/lib/data/select";
import { useQuestionStore } from "@/provider/question-store-provider";

interface IQuestionProps {}

const QuestionContent: React.FunctionComponent<{
  type: QuestionTypeTest;
}> = ({ type }) => {
  switch (type) {
    case "input":
      return <QuestionInput />;
    case "select":
      return <QuestionSelect type="single" />;
    case "stars":
      return <QuestionRatingInput />;
    case "textarea":
      return <QuestionTextArea />;
    case "bar":
      return <QuestionSlider />;
    case "date":
      return <QuestionDatePicker />;
    default:
      return null;
  }
};

const Question: React.FunctionComponent<IQuestionProps> = () => {
  // 값을 가져오지 못할 경우 에러 관리
  const { currentQuestionIndex, questions } = useQuestionStore(
    (state) => state
  );
  const { imageUrl, title, type } = questions[currentQuestionIndex];

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center px-[16px]">
      <div
        className={cn(
          "min-h-[400px] w-full",
          imageUrl
            ? "mt-[40px] space-y-[24px]"
            : "flex flex-col items-center justify-center gap-y-[13px]"
        )}
      >
        <QuestionTitle>{title}</QuestionTitle>
        {imageUrl ? (
          <div
            style={{ backgroundImage: `url(${imageUrl})` }}
            className="mx-auto h-[240px] w-full rounded-[18px]"
          />
        ) : null}
        <QuestionContent type={type} />
      </div>
    </div>
  );
};

export default Question;