"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

interface IQuestionProgressbarProps {}

const QuestionProgressbar: React.FunctionComponent<
  IQuestionProgressbarProps
> = () => {
  // zustand or props로 지금 현재 문제, 전체 문제 받기
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={200} className="fixed mx-auto w-full max-w-3xl" />;
};

export default QuestionProgressbar;
