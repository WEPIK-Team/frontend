import { faker } from "@faker-js/faker";

import Question from "./components/question";
import QuestionHeader from "./components/question-header";
import QuestionProgressbar from "./components/question-progressbar";

import PrevNextBtns from "./components/prev-next-btns";

export default function QuestionPage() {
  // data fetching....

  return (
    <div className="w-full ">
      <div className="s">
        {/* Header */}
        <QuestionHeader />
        {/* Progressbar */}
        <QuestionProgressbar />
      </div>
      {/* Question */}
      <div className="mt-[38px]">
        <Question
          title="셋중 더 드랍하고 싶은 강의는?"
          type=""
          imageURL={faker.image.url()}
        />
      </div>
      {/* Buttons */}
      <PrevNextBtns />
    </div>
  );
}
