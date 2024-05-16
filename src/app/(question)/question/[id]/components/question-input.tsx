import * as React from "react";

import { Input } from "@/components/ui/input";

interface IQuestionInputProps {}

const QuestionInput: React.FunctionComponent<IQuestionInputProps> = (props) => {
  return (
    <Input
      className="rounded-input-default border-[#676767] p-[20px]"
      placeholder="답변을 입력하세요"
    />
  );
};

export default QuestionInput;
