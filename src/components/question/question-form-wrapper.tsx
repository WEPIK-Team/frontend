import * as React from "react";

import { cn } from "@/lib/utils";

import useQuestion from "@/hooks/use-question";

interface IQuestionFormWrapperProps {
  children: React.ReactNode;
}

const QuestionFormWrapper: React.FunctionComponent<
  IQuestionFormWrapperProps
> = ({ children }) => {
  const {
    currentQuestion: { imageURL },
  } = useQuestion();
  return (
    <div
      className={cn(
        "flex w-full flex-col ",
        imageURL
          ? "h-full"
          : "h-full max-h-[350px] items-center justify-between gap-y-[20px] sm:max-h-[400px]"
      )}
    >
      {children}
    </div>
  );
};

export default QuestionFormWrapper;
