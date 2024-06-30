"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import ShowTemplateButton from "@/components/button/show-template-button";
import { Button } from "@/components/ui/button";

const extractQuestionPath = (path: string) => {
  const pathSegments = path.split("/").filter(Boolean).slice(0, 2);
  return `/${pathSegments.join("/")}`;
};

const QuestionResultButton = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleResultClick = () => {
    const url = `${window.location.origin}${extractQuestionPath(window.location.pathname)}`;
    router.push(
      `${url}/result/${searchParams.get("senderId")}/${searchParams.get("receiverId")}`
    );
  };
  return (
    <>
      <Button
        className="h-[60px] w-full rounded-[30px] bg-wpc-second-grad text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-105"
        onClick={handleResultClick}
      >
        <span className="text-wpt-lg font-semibold">답변 확인하기</span>
      </Button>
      <ShowTemplateButton />
    </>
  );
};

export default QuestionResultButton;
