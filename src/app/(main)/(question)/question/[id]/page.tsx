import { faker } from "@faker-js/faker";

import PrevNextBtns from "./components/prev-next-btns";
import Question from "./components/question";
import QuestionHeader from "./components/question-header";
import QuestionProgressbar from "./components/question-progressbar";

export default function QuestionPage() {
  // 질문 데이터 가져오기
  return (
    <>
      <QuestionHeader />
      <div className="relative mx-auto max-w-3xl px-4 py-[44px]">
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
