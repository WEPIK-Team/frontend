"use client";

import * as React from "react";

import Heading from "@/components/common/heading";

import useQuestion from "@/hooks/use-question";

interface IQuestionTitleProps {
  children: string;
}

const QuestionTitle: React.FunctionComponent<IQuestionTitleProps> = ({
  children,
}) => {
  // zustand로 현재 문제 index 확인
  const { currentQuestionIndex, questions } = useQuestion();

  return (
    <div className="mx-auto max-w-[240px] space-y-[10px] text-center leading-[22px] sm:max-w-none">
      <h1>
        <span className="text-wpt-xl font-semibold text-wpc-primary">{`Q${currentQuestionIndex + 1}`}</span>
        <span className="text-wpt-md font-light">
          <span className="mx-1">/</span>
          <span>{`${questions.length}`}</span>
        </span>
      </h1>
      <Heading as="h2" className="break-keep text-wpt-lg font-semibold">
        {children}
      </Heading>
    </div>
  );
};

export default QuestionTitle;
