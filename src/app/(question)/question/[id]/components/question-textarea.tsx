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
        className="rounded-input-default border border-[#676767] px-[18px] py-[20px] "
        minLength={500}
        placeholder="답변을 입력하세요"
      />
      <QuestionTextCounter max={120} current={1} />
    </div>
  );
};

export default QuestionTextArea;
