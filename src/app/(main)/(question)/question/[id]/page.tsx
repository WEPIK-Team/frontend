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

        {/* <SelectResult
          options={[
            {
              label: "불시에 기습 과제 날리는 교수님",
              value: "test123124",
              selectedBy: "receiver",
            },
            {
              label: "한 주도 빠짐 없이 과제 내주는 교수님",
              value: "test12412412",
              selectedBy: "sender",
            },
            {
              label: "수업 때 잡담만 하는데 시험 어렵게 내는 교수님",
              value: "test231",
              selectedBy: "none",
            },
          ]}
        /> */}
      </div>
    </>
  );
}
