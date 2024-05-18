"use client";
import Image from "next/image";

import QuestionTitle from "./question-title";

interface IQuestionProps {
  title: string;
  type: string;
  imageURL: string;
}

const Question: React.FunctionComponent<IQuestionProps> = ({
  title,
  type,
  imageURL,
}) => {
  /**
   * title?
   * total problem?
   * input type?
   */

  return (
    <div className="space-y-2">
      {type}
      <QuestionTitle>{title}</QuestionTitle>
      <Image
        alt="question-image"
        className="mx-auto rounded-[18px]"
        src={imageURL}
        width={358}
        height={240}
      />
    </div>
  );
};

export default Question;
