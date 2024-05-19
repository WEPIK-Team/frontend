"use client";
import Image from "next/image";

import QuestionSlider from "./question-slider";
import QuestionTitle from "./question-title";
import RatingInput from "./rating-input";

interface IQuestionProps {
  title: string;
  type: string;
  imageURL?: string;
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
    <div className="min-h-[400px] space-y-2 px-10 ">
      {type}
      <QuestionTitle>{title}</QuestionTitle>
      {imageURL ? (
        <Image
          alt="question-image"
          className="mx-auto rounded-[18px]"
          src={imageURL}
          width={358}
          height={240}
        />
      ) : null}
      <div className="mx-auto w-full">
        <RatingInput id={10} size={50} />
      </div>
      <QuestionSlider />
    </div>
  );
};

export default Question;
