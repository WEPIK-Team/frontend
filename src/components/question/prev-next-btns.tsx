"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import useQuestion from "@/hooks/use-question";

import { IQuestion, QuestionType } from "@/types/question";

interface IPrevNextBtnsProps<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>;
  type: QuestionType;
}

const PrevNextBtns = <T extends FieldValues>({
  form,
  type,
}: IPrevNextBtnsProps<T>) => {
  // params
  const { id: templateId } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const senderId = searchParams.get("senderId") ?? undefined;

  const router = useRouter();

  // zustand
  const {
    questions,
    maxLength,
    currentQuestion,
    currentQuestionIndex: index,
    clearQuestion,
    nextQuestion,
    prevQuestion,
    updateQuestion,
  } = useQuestion();

  const { id: questionId, imageURL } = currentQuestion;

  // function
  const handlePrev = form.handleSubmit((data: T) => {
    const newValue =
      type !== "DATE"
        ? data[type]
        : formatDateforServer({
            from: data.DATE.from,
            to: data.DATE.to,
          });

    updateQuestion({ id: questionId, newValue });
    prevQuestion();
  });

  const handleNext = form.handleSubmit(async (data: T) => {
    const newValue =
      type !== "DATE"
        ? data[type]
        : formatDateforServer({
            from: data.DATE.from,
            to: data.DATE.to,
          });

    if (index === maxLength) {
      updateQuestion({ id: questionId, newValue });
      const requestData = generateQuestionRequestData({
        questions,
        templateId,
        senderId,
      });

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          // 라우트 이동
          console.log("Success:", data);
          clearQuestion();
          router.replace("/");
        })
        .catch((error) => {
          // 에러 발생
          console.error("Error:", error);
          throw new Error(error.message);
        });
    } else {
      updateQuestion({ id: questionId, newValue });
      nextQuestion();
    }
  });

  return (
    <div
      className={cn(
        " absolute bottom-0 mx-auto flex w-full gap-x-4",
        imageURL ? "" : "mt-[40px]"
      )}
    >
      <Button
        type="button"
        onClick={handlePrev}
        className="w-full bg-wpc-light-gray text-wpc-gray"
        variant="gray"
      >
        이전
      </Button>
      <Button
        onClick={handleNext}
        variant="default"
        type="button"
        className="w-full"
      >
        {maxLength === index ? "완료" : "다음"}
      </Button>
    </div>
  );
};

export default PrevNextBtns;

export function formatDateforKor(date: Date): null | string {
  if (!date) return null;
  return format(date, "yyyy/MM/dd", {
    locale: ko,
  });
}

export function formatDateforServer({ from, to }: { from: Date; to?: Date }) {
  const newValue = to
    ? `${formatDateforKor(from)} - ${formatDateforKor(to)}`
    : `${formatDateforKor(from)}`;

  return newValue;
}

function generateQuestionRequestData({
  questions,
  templateId,
  senderId,
}: {
  questions: IQuestion[];
  templateId: string;
  senderId?: string;
}) {
  const uuid = senderId ? senderId : "";
  return {
    uuid,
    templateId,
    answerDtos: questions,
  };
}
