"use client";

import { Textarea } from "@/components/ui/textarea";
import * as React from "react";

interface IQuestionTextAreaProps {}

const QuestionTextArea: React.FunctionComponent<IQuestionTextAreaProps> = (
  props,
) => {
  return (
    <div>
      <Textarea
        className="rounded-input-default border border-[#676767] px-[18px] py-[20px] "
        minLength={500}
        placeholder="답변을 입력하세요"
      />
      <p className="text-right text-[13px] text-[#676767]">100/500</p>
    </div>
  );
};

export default QuestionTextArea;
