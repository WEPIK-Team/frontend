import { Input } from "@/components/ui/input";

import QuestionTextCounter from "./question-text-counter";

interface IQuestionInputProps {}

const QuestionInput: React.FunctionComponent<IQuestionInputProps> = () => {
  return (
    <div>
      <Input disabled={false} placeholder="답변을 입력하세요" />
      <QuestionTextCounter max={50} current={1} />
    </div>
  );
};

export default QuestionInput;
