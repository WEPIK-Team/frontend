"use client";

import { useEffect, useState } from "react";

import GlobalLoadingModal from "@/components/modal/global-loading-modal";
import Question from "@/components/question/question";
import QuestionHeader from "@/components/question/question-header";

export default function QuestionPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <main className="h-svh pb-[10px] pt-[40px]">
      <QuestionHeader />
      <Question />
      <GlobalLoadingModal
        title="잠시만 기다려 주세요"
        description="데이터를 불러오는 중 입니다...."
      />
    </main>
  );
}
