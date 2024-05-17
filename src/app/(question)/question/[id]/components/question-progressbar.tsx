"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

interface IQuestionProgressbarProps {}

const QuestionProgressbar: React.FunctionComponent<
  IQuestionProgressbarProps
> = (props) => {
  // zustand or props로 지금 현재 문제, 전체 문제 받기
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="">
      <Progress value={progress} className="w-full " />
    </div>
  );
};

export default QuestionProgressbar;
