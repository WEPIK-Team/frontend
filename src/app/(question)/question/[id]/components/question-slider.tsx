"use client";

import { Slider } from "@/components/ui/slider";
import * as React from "react";

interface IQuestionSliderProps {}

const QuestionSlider: React.FunctionComponent<IQuestionSliderProps> = () => {
  const [value, setValue] = React.useState([50]);

  return (
    <Slider
      value={value}
      onValueChange={(newValue) => setValue(newValue)}
      min={0}
      max={100}
      step={1}
    />
  );
};

export default QuestionSlider;
