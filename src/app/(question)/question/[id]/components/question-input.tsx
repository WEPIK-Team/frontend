import { Input } from "@/components/ui/input";

import QuestionTextCounter from "./question-text-counter";

interface IQuestionInputProps {}

const QuestionInput: React.FunctionComponent<IQuestionInputProps> = () => {
  return (
    <div>
      <Input
        className="rounded-input-default border-[#676767] p-[20px]"
        placeholder="답변을 입력하세요"
      />
      <QuestionTextCounter max={120} current={1} />
    </div>
  );
};

export default QuestionInput;
