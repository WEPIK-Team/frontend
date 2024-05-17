"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";

import QuestionInput from "./question-input";
import QuestionTextArea from "./question-textarea";
import QuestionTitle from "./question-title";

interface IQuestionProps {
  title: string;
}

const Question: React.FunctionComponent<IQuestionProps> = () => {
  /**
   * title?
   * total problem?
   * input type?
   */
  return (
    <div>
      <QuestionInput />
      <QuestionTitle>당신이 가장 좋아하는 아이스크림은?</QuestionTitle>
      <QuestionTextArea />
      <Slider defaultValue={[33]} max={100} step={1} />
    </div>
  );
};

export default Question;
