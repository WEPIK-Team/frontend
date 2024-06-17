"use client";

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
import {
  allQuestionCheck,
  formatDateforServer,
  generateQuestionRequestData,
} from "@/lib/question";

import { toast } from "@/components/ui/use-toast";

import { QuestionType } from "@/types/question";

import "@/components/question/button-animation.css";

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
            variant: "destructive",
            className: cn(
              "top-20 -translate-x-1/2 left-1/2 flex fixed md:max-w-[350px]"
            ),
            title: `아직 다 작성하시지 않은 문제가 있어요!`,
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
            router.replace(`${pathname}/success/sender?senderId=${receiverId}`);
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
    <div
      className={cn(
        "absolute bottom-0 mx-auto flex w-full  gap-x-4",
        imageURL ? "" : "mt-[40px]"
      )}
    >
      <Button
        type="button"
        onClick={handlePrev}
        className="w-full"
        variant="gray"
        disabled={isLoadingOpen}
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
        variant="default"
        type="button"
        className={cn(
          "relative w-full shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)] transition active:shadow-none",
          maxLength === index ? "bubbly-button" : ""
        )}
      >
        {maxLength === index ? "완료" : "다음"}
      </Button>
    </div>
  );
};

export default PrevNextBtns;
