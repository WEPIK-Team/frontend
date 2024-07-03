"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import * as React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import "@/components/question/button-animation.css";

import { completeQuestionAnswer } from "@/lib/api/question";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import useGlobalLoadingModalStore from "@/store/global-loading-modal-store";

import useQuestion from "@/hooks/use-question";
import {
  allQuestionCheck,
  formatDateforServer,
  generateQuestionRequestData,
} from "@/lib/question";

import { QuestionType } from "@/types/question";

interface IPrevNextBtnsProps<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>;
  type: QuestionType;
  disabled?: boolean;
}

const PrevNextBtns = <T extends FieldValues>({
  form,
  type,
  disabled,
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

  const {
    isOpen: isLoadingOpen,
    onOpen: onLoadingOpen,
    onClose: onLoadingClose,
  } = useGlobalLoadingModalStore();

  // function

  const handleSubmit = async ({
    data,
    submitType,
  }: {
    data: T;
    submitType: "prev" | "next" | "send";
  }) => {
    const newValue =
      type !== "DATE"
        ? data[type]
        : formatDateforServer({
            from: data.DATE.from,
            to: data.DATE.to,
          });

    // 새로운 배열 업데이트
    const newQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, content: newValue } : q
    );
    updateQuestion(newQuestions);

    switch (submitType) {
      case "prev":
        prevQuestion();
        break;
      case "next":
        nextQuestion();
        break;
      case "send":
        if (!allQuestionCheck(newQuestions)) {
          toast({
            variant: "error",
            title: `작성하지 않은 답변이 있어요.`,
          });
          break;
        } else {
          onLoadingOpen();
          const requestData = generateQuestionRequestData({
            questions: newQuestions,
            templateId,
            senderId: senderIdParams,
          });

          const { receiverId, senderId } =
            await completeQuestionAnswer(requestData);

          onLoadingClose();
          clearQuestion();

          if (senderIdParams && receiverId && senderId) {
            router.replace(
              `${pathname}/success/receiver?senderId=${senderId}&receiverId=${receiverId}`
            );
          } else {
            router.replace(`${pathname}/success/sender?senderId=${senderId}`);
          }
        }
        break;
      default:
        break;
    }
  };

  const handlePrev = () => {
    prevQuestion();
  };

  const handleNext = form.handleSubmit((data: T) => {
    handleSubmit({ data, submitType: "next" });
  });

  const handleSend = form.handleSubmit(
    async (data: T) => await handleSubmit({ data, submitType: "send" })
  );

  const animateButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    target.classList.remove("animate");
    target.classList.add("animate");
    setTimeout(() => {
      target.classList.remove("animate");
    }, 450);
  };

  return (
    <div className={cn("mb-[20px] flex w-full gap-x-4")}>
      <Button
        type="button"
        onClick={handlePrev}
        className="w-full"
        variant="gray"
      >
        이전
      </Button>
      <Button
        onClick={(e) => {
          if (maxLength === index) {
            animateButton(e);
            handleSend();
          } else {
            handleNext();
          }
        }}
        disabled={disabled}
        variant="default"
        type="button"
        className={cn(
          " relative w-full shadow-[0px_0px_10px_0px_rgba(99,119,221,0.5)] transition active:shadow-none disabled:shadow-[0px_0px_10px_0px_rgba(238,237,241,1)]"
        )}
      >
        {maxLength === index ? "완료" : "다음"}
      </Button>
    </div>
  );
};

export default PrevNextBtns;
