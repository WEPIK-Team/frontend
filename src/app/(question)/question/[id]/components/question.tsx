"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";

import QuestionInput from "./question-input";
import QuestionTextArea from "./question-textarea";
import QuestionTitle from "./question-title";
import { Button } from "@/components/ui/button";

interface IQuestionProps {
  title: string;
  type: string;
}

const Question: React.FunctionComponent<IQuestionProps> = () => {
  /**
   * title?
   * total problem?
   * input type?
   */
  return (
    <div className="px-2">
      <QuestionInput />
      <QuestionTitle>당신이 가장 좋아하는 아이스크림은?</QuestionTitle>
      <QuestionTextArea />
      <Slider defaultValue={[33]} max={100} step={1} />
      <div className="flex w-full gap-x-[10px] bg-red-200">
        {/* 제일 처음이면 취소 버튼 */}
        <Button
          className="bg-white text-primary"
          size="question"
          variant="question"
        >
          {"이전"}
        </Button>
        {/* 마지막이면 완료 버튼 */}
        <Button
          className="bg-primary text-white"
          size="question"
          variant="question"
        >
          {"다음"}
        </Button>
      </div>
    </div>
  );
};

export default Question;
