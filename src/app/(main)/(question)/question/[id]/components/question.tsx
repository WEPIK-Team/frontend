"use client";
import Image from "next/image";

import QuestionSelect from "./question-select";
import QuestionTitle from "./question-title";
import RatingInput from "./rating-input";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "min-h-[400px] ",
        imageURL
          ? "mt-[40px] space-y-[13px]"
          : "flex flex-col items-center justify-center gap-y-[13px]"
      )}
    >
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
      {/* <QuestionSelect
        type="single"
        options={[
          {
            label: "불시에 기습 과제 날리는 교수님",
            value: "test",
          },
          {
            label: "한 주도 빠짐 없이 과제 내주는 교수님",
            value: "test2",
          },
          {
            label: "수업 때 잡담만 하는데 시험 어렵게 내는 교수님",
            value: "test2",
          },
        ]}
      /> */}
    </div>
  );
};

export default Question;
