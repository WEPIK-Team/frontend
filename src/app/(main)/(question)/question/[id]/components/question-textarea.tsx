"use client";

import { Textarea } from "@/components/ui/textarea";

import QuestionTextCounter from "./question-text-counter";

interface IQuestionTextAreaProps {
  value?: string;
  readonly?: boolean;
}

const QuestionTextArea: React.FunctionComponent<IQuestionTextAreaProps> = ({
  readonly,
  value,
}) => {
  return (
    <div>
      <Textarea
        variant="grad"
        maxLength={300}
        placeholder="답변을 입력하세요"
        isError
        readOnly={readonly}
        value={value}
      />
      <QuestionTextCounter max={300} current={1} />
    </div>
  );
};

export default QuestionTextArea;
