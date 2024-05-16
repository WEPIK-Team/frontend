"use client";

import * as React from "react";

import QuestionInput from "./question-input";
import QuestionTextArea from "./question-textarea";
import QuestionTitle from "./question-title";

interface IQuestionProps {
  title: string;
}

const Question: React.FunctionComponent<IQuestionProps> = (props) => {
  /**
   * title?
   * total problem?
   * input type?
   */
  return (
    <div>
      <QuestionInput />
      <QuestionTitle title="당신이 가장 좋아하는 아이스크림은?" />
      <QuestionTextArea />
    </div>
  );
};

export default Question;
