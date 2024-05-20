"use client";
import Image from "next/image";

import QuestionSelect from "./question-select";
import QuestionTitle from "./question-title";
import RatingInput from "./rating-input";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import QuestionInput from "./question-input";
import QuestionTextArea from "./question-textarea";
import { Slider } from "@/components/ui/slider";
import QuestionSlider from "./question-slider";
import QuestionDatePicker from "./question-datepicker";

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
  return (
    <div
      className={cn(
        "min-h-[400px] ",
        imageURL
          ? "mt-[40px] space-y-[13px]"
          : "flex flex-col items-center  justify-center gap-y-[13px]"
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

      {type === "input" && <QuestionInput />}
      {type === "select" && (
        <QuestionSelect
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
          <RatingInput id={10} size={56} />
        </div>
      )}
      {type === "textArea" && <QuestionTextArea />}
      {type === "progress" && <QuestionSlider />}
      {type === "datepicker" && <QuestionDatePicker />}
    </div>
  );
};

export default Question;
