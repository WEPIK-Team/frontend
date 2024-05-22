import * as React from "react";

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";

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
    <Label className={cn("text-wpt-base-1", labelObj[color])}>{children}</Label>
  );
};

export default QuestionLabel;
