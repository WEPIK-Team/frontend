import { faker } from "@faker-js/faker";

import PrevNextBtns from "./components/prev-next-btns";
import Question from "./components/question";
import QuestionHeader from "./components/question-header";
import QuestionProgressbar from "./components/question-progressbar";

export default function QuestionPage() {
  // data fetching....

  return (
    <>
      {/* Header */}
      <QuestionHeader />
      <div className="relative py-[44px]">
        {/* Progressbar */}
        <QuestionProgressbar />
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
    </>
  );
}
