import * as React from "react";

interface IQuestionTextCounterProps {
  current: number;
  max: number;
}

const QuestionTextCounter: React.FunctionComponent<
  IQuestionTextCounterProps
> = ({ current, max }) => {
  return (
    <p className="text-right text-[13px] text-[#676767]">
      {`${current} / ${max}`}
    </p>
  );
};

export default QuestionTextCounter;
