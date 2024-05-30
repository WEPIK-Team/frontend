"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

import useQuestion from "@/hooks/use-question";

interface IQuestionProgressbarProps {}

const QuestionProgressbar: React.FunctionComponent<
  IQuestionProgressbarProps
> = () => {
  // zustand or props로 지금 현재 문제, 전체 문제 받기
  const { currentQuestionIndex, questions } = useQuestion();

  return (
    <Progress
      value={(currentQuestionIndex + 1) * 10}
      maxValue={questions.length * 10}
      className="w-full max-w-3xl"
    />
  );
};

export default QuestionProgressbar;
