import * as React from "react";

interface IQuestionTextCounterProps {
  current: number;
  max: number;
}

const QuestionTextCounter: React.FunctionComponent<
  IQuestionTextCounterProps
> = ({ current, max }) => {
  return (
    <div className="text-right text-wpc-gray">
      <p className="text-wpt-sm">
        <span className="font-semibold text-wpc-primary">{current}</span>
        <span>/</span>
        <span>{max}</span>
      </p>
    </div>
  );
};

export default QuestionTextCounter;
