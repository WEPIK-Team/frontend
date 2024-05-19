"use client";

import Heading from "@/components/common/heading";
import * as React from "react";

interface IQuestionTitleProps {
  children: string;
}

const QuestionTitle: React.FunctionComponent<IQuestionTitleProps> = ({
  children,
}) => {
  // zustand로 현재 문제 현황 확인
  return (
    <div className="mx-auto max-w-[240px] text-center leading-[22px]">
      <h1>
        <span className="text-wpc-primary font-allroundgothic  text-wpt-xl font-semibold">{`Q${1}`}</span>
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
