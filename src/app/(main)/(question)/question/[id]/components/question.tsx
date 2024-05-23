"use client";
import React from "react";

import { cn } from "@/lib/utils";

import QuestionDatePicker from "./question-datepicker";
import QuestionInput from "./question-input";
import QuestionSelect from "./question-select";
import QuestionSlider from "./question-slider";
import QuestionTextArea from "./question-textarea";
import QuestionTitle from "./question-title";
import RatingInput from "./rating-input";

interface IQuestionProps {
  title: string;
  type: "input" | "select" | "progress" | "rating" | "textArea" | "datepicker";
  imageURL?: string;
}

const Question: React.FunctionComponent<IQuestionProps> = ({
  title,
  type,
  imageURL,
}) => {
  const [rating, setRating] = React.useState<number>(0);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const [rating, setRating] = React.useState<number>(0);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  return (
    <div
      className={cn(
        "min-h-[400px] w-full ",
        imageURL
          ? "mt-[40px] space-y-[24px]"
          : "flex flex-col items-center justify-center gap-y-[13px]"
      )}
    >
      <QuestionTitle>{title}</QuestionTitle>
      {imageURL ? (
        <div
          style={{
            backgroundImage: `url(${imageURL})`,
          }}
          className={cn(`mx-auto h-[240px] w-full rounded-[18px]`)}
        />
      ) : null}

      {type === "input" && <QuestionInput />}
      {type === "select" && (
        <QuestionSelect
          color="sender"
          type="single"
          options={[
            {
              label: "불시에 기습 과제 날리는 교수님",
              value: "test123124",
            },
            {
              label: "한 주도 빠짐 없이 과제 내주는 교수님",
              value: "test12412412",
            },
            {
              label: "수업 때 잡담만 하는데 시험 어렵게 내는 교수님",
              value: "test231",
            },
          ]}
        />
      )}
      {type === "rating" && (
        <div className="mx-auto w-full">
          <RatingInput
            id={10}
            size={56}
            color="receiver"
            value={rating}
            onRateChange={handleRatingChange}
          />
          <RatingInput
            id={10}
            size={56}
            color="receiver"
            value={rating}
            onRateChange={handleRatingChange}
          />
        </div>
      )}
      {type === "textArea" && <QuestionTextArea />}
      {type === "progress" && <QuestionSlider color="default" />}
      {type === "datepicker" && <QuestionDatePicker />}
    </div>
  );
};

export default Question;
