import * as React from "react";

interface IQuestionLabelProps {
  color: "sender" | "receiver";
  children: React.ReactNode;
}

const labelObj = {
  sender: "text-wpc-primary",
  receiver: "text-wpc-second",
};

const QuestionLabel: React.FunctionComponent<IQuestionLabelProps> = ({
  color,
  children,
}) => {
  return (
    <p className={`text-wpt-base-1 font-medium ${labelObj[color]}`}>
      {children}
    </p>
  );
};

export default QuestionLabel;
