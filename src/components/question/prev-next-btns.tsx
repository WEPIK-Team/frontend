"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import * as React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { completeQuestionAnswer } from "@/lib/api/question";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import useGlobalLoadingModalStore from "@/store/global-loading-modal-store";

import useQuestion from "@/hooks/use-question";

import { IAnswerQuestionParam, QuestionType } from "@/types/question";

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
  const senderIdParams = searchParams.get("senderId") ?? undefined;

  const router = useRouter();
  const pathname = usePathname();

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

  const { onOpen: onLoadingOpen, onClose: onLoadingClose } =
    useGlobalLoadingModalStore();

  // function

  const handleSubmit = async (data: T, direction: "prev" | "next") => {
    const newValue =
      type !== "DATE"
        ? data[type]
        : formatDateforServer({
            from: data.DATE.from,
            to: data.DATE.to,
          });

    updateQuestion({ id: questionId, newValue });

    if (direction === "next") {
      if (index === maxLength) {
        onLoadingOpen();
        const requestData = generateQuestionRequestData({
          questions,
          templateId,
          senderId: senderIdParams,
        });

        // Success
        const { receiverId, senderId } =
          await completeQuestionAnswer(requestData);

        if (!receiverId) {
          clearQuestion();
          throw new Error(
            "데이터를 저장하던 도중 server에서 오류가 발생하였습니다!"
          );
        }

        clearQuestion();
        onLoadingClose();

        if (senderIdParams) {
          router.replace(
            `${pathname}/success/sender/receiver?senderId=${senderId}&receiver=${receiverId}`
          );
        } else {
          router.replace(`${pathname}/success/sender?senderId=${receiverId}`);
        }
      } else {
        nextQuestion();
      }
    } else {
      prevQuestion();
    }
  };

  const handlePrev = form.handleSubmit((data: T) => handleSubmit(data, "prev"));
  const handleNext = form.handleSubmit((data: T) => handleSubmit(data, "next"));

  return (
    <div
      className={cn(
        "absolute bottom-0 mx-auto flex w-full gap-x-4",
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
}: IAnswerQuestionParam) {
  const uuid = senderId ? senderId : null;

  const answerDtos = questions.map((question, i) => ({
    content: question.content,
    type: question.type,
    questionId: parseInt(question.id),
    sequence: i + 1,
  }));

  if (!uuid)
    return {
      templateId: parseInt(templateId),
      answerDtos,
    };

  return {
    uuid,
    templateId: parseInt(templateId),
    answerDtos,
  };
}
