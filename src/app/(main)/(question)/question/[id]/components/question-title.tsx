"use client";

import * as React from "react";

import Heading from "@/components/common/heading";

interface IQuestionTitleProps {
  children: string;
}

const QuestionTitle: React.FunctionComponent<IQuestionTitleProps> = ({
  children,
}) => {
  // zustand로 현재 문제 index 확인
  return (
    <div className="mx-auto max-w-[240px] space-y-[10px] text-center leading-[22px]">
      <h1>
        <span className="font-allroundgothic text-wpt-xl font-semibold text-wpc-primary">{`Q${1}`}</span>
        <span className="text-wpt-md font-light">
          <span className="mx-1">/</span>
          <span>{`${6}`}</span>
        </span>
      </h1>
      <Heading as="h2" className="break-keep text-wpt-lg font-semibold">
        {children}
      </Heading>
    </div>
  );
};

export default QuestionTitle;
