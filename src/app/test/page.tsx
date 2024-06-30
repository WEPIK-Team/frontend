"use client";

import QuestionLabel from "@/components/question/question-label";
import { Slider } from "@/components/ui/slider";

const ButtonPage = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-3 py-5 ">
      <QuestionLabel color="sender">보낸사람</QuestionLabel>
      <Slider value={[70]} theme="sender" readOnly />
      <QuestionLabel color="receiver">받는사람</QuestionLabel>
      <Slider value={[85]} theme="receiver" />
    </div>
  );
};
export default ButtonPage;
