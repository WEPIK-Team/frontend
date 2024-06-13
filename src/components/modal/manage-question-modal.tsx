"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { getQuestionbyId } from "@/lib/api/manage-question";

import QuestionForm from "@/components/manage/question-form";
import { Modal } from "@/components/modal/modal";

import { IQuestion, QuestionType } from "@/types/question";

interface IManageQuestionModal {
  mode: "create" | "edit";
  isOpen: boolean;
  questionId?: number;
  onClose: () => void;
  onConfirm: () => void;
}

export const ManageQuestionModal: React.FC<IManageQuestionModal> = ({
  mode,
  isOpen,
  onClose,
  questionId,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [data, setData] = useState<
    Omit<IQuestion, "type"> & {
      type: "" | QuestionType;
    }
  >({
    id: 0,
    imageURL: "",
    title: "",
    type: "",
    selectQuestions: [],
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (questionId) {
      setLoading(true);
      getQuestionbyId(questionId)
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          throw new Error(error.message);
        });
    } else {
      setLoading(false);
    }
  }, [questionId]);

  if (!isMounted) {
    return null;
  }

  const modeTitle = `${mode === "create" ? "질문 생성" : "질문 수정"}`;
  const buttonConfirmName = `${mode === "create" ? "생성" : "수정"}`;

  return (
    <Modal title={modeTitle} desc="" isOpen={isOpen} onClose={onClose}>
      {isLoading ? (
        <div className="flex w-full flex-col items-center justify-center">
          <Image
            src="/gifs/loading.gif"
            alt="loading"
            width={324}
            height={324}
          />
          {/* <Heading as="h2">질문 데이터를 로딩 중 입니다</Heading>
          <p className="text-wpt-base-1 text-wpc-gray">잠시만 기다려 주세요</p> */}
        </div>
      ) : (
        <QuestionForm
          buttonConfirmName={buttonConfirmName}
          onClose={onClose}
          questionData={data}
          mode={mode}
        />
      )}
    </Modal>
  );
};
