"use client";

import * as React from "react";

interface IQuestionTitleProps {
  title: string;
}

const QuestionTitle: React.FunctionComponent<IQuestionTitleProps> = ({
  title,
}) => {
  // zustand로 현재 문제 현황 확인
  return (
    <div className="text-center leading-[22px]">
      <h1 className="text-[22px] font-bold text-[#676767] ">
        <span className="">{`Q${1}`}</span>
        <span className="text-[16px] font-light">
          <span className="mx-1">/</span>
          <span>{`${6}`}</span>
        </span>
      </h1>
      <h2 className="text-[20px]  font-semibold ">{title}</h2>
    </div>
  );
};

export default QuestionTitle;
