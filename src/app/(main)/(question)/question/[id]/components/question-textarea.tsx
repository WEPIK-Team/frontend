"use client";

import { Textarea } from "@/components/ui/textarea";

import QuestionTextCounter from "./question-text-counter";

interface IQuestionTextAreaProps {}

const QuestionTextArea: React.FunctionComponent<
  IQuestionTextAreaProps
> = () => {
  return (
    <div>
      <Textarea
        maxLength={300}
        placeholder="답변을 입력하세요"
        isGrad
        isError
      />
      <QuestionTextCounter max={300} current={1} />
    </div>
  );
};

export default QuestionTextArea;
