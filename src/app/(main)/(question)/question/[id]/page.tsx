"use client";

import { useEffect, useState } from "react";

import Question from "@/components/question/question";
import QuestionHeader from "@/components/question/question-header";

export default function QuestionPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <main className="h-full pb-[10px] pt-[40px]">
      <QuestionHeader />
      <Question />
    </main>
  );
}
