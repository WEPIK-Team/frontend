"use client";

import Question from "./components/question";
import QuestionHeader from "./components/question-header";

export default function QuestionPage() {
  return (
    <main className="py-[44px]">
      <QuestionHeader />
      <Question />
    </main>
  );
}
