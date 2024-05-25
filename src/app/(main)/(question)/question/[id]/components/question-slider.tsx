"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";

interface IQuestionSliderProps {
  color: "sender" | "receiver" | "default";
}

const sliderObj = {
  sender: "bg-wpc-primary-grad",
  receiver: "bg-wpc-second-grad",
  default: "bg-wpc-gray",
};

const QuestionSlider: React.FunctionComponent<IQuestionSliderProps> = ({
  color,
}) => {
  const [value, setValue] = React.useState([50]);

  return (
    <Slider
      value={value}
      onValueChange={(newValue) => setValue(newValue)}
      min={0}
      max={100}
      step={1}
      theme="receiver"
    />
  );
};

export default QuestionSlider;
