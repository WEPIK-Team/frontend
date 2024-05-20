import { faker } from "@faker-js/faker";

import PrevNextBtns from "./components/prev-next-btns";
import Question from "./components/question";
import QuestionHeader from "./components/question-header";

export default function QuestionPage() {
  // 질문 데이터 가져오기
  return (
    <>
      <QuestionHeader />
      <div className="relative mx-auto  w-full max-w-3xl px-[16px] py-[44px]">
        {/* Question */}
        <Question
          title="셋중 더 드랍하고 싶은 강의는?"
          type="progress"
          imageURL={faker.image.url()}
        />
        {/* Buttons */}
        <PrevNextBtns />
      </div>
    </>
  );
}
