"use client";

import Question from "@/components/question/question";
import QuestionHeader from "@/components/question/question-header";

export default function QuestionPage() {
  return (
    <main className="py-[44px]">
      <QuestionHeader />
      <Question />
    </main>
  );
}
