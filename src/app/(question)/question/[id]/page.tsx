import { faker } from "@faker-js/faker";

import Question from "./components/question";
import QuestionHeader from "./components/question-header";
import QuestionProgressbar from "./components/question-progressbar";

export default function QuestionPage() {
  // data fetching....

  return (
    <div className="w-full ">
      {/* Header */}
      <QuestionHeader />
      {/* Progressbar */}
      <QuestionProgressbar />
      {/* Question */}
      <Question
        title="셋중 더 드랍하고 싶은 강의는?"
        type=""
        imageURL={faker.image.url()}
      />
    </div>
  );
}
