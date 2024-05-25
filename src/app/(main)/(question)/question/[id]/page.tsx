import { faker } from "@faker-js/faker";

import PrevNextBtns from "./components/prev-next-btns";
import Question from "./components/question";
import QuestionHeader from "./components/question-header";

export default function QuestionPage() {
  // 질문 데이터 가져오기
  return (
    <main className="py-[44px]">
      <QuestionHeader />
      <div className=" mx-auto flex w-full max-w-xl flex-col items-center justify-center px-[16px]">
        {/* Question */}
        <Question
          title="셋중 더 드랍하고 싶은 강의는?"
          type="select"
          imageURL={faker.image.url()}
        />
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
    </main>
  );
}
