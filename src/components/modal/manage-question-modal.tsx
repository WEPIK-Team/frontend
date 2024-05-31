"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/modal/modal";

import QuestionForm from "@/components/manage/question-form";

interface IManageQuestionModal {
  mode: "create" | "edit";
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const ManageQuestionModal: React.FC<IManageQuestionModal> = ({
  mode,
  isOpen,
  onConfirm,
  onClose,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const modeTitle = `${mode === "create" ? "질문 생성" : "질문 수정"}`;
  const buttonConfirm = `${mode === "create" ? "생성" : "수정"}`;

  return (
    <Modal title={modeTitle} desc="" isOpen={isOpen} onClose={onClose}>
      <QuestionForm />
      <div className="mt-10 flex items-center justify-end space-x-2 overflow-y-auto">
        <button
          disabled={loading}
          onClick={onClose}
          className="h-fit rounded-[16px] bg-wpc-light-gray px-[30px] py-[13px] text-wpc-gray disabled:cursor-not-allowed disabled:opacity-70"
        >
          취소
        </button>
        <button
          disabled={loading}
          onClick={onConfirm}
          className="h-fit rounded-[16px] bg-wpc-primary px-[30px] py-[13px] text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {buttonConfirm}
        </button>
      </div>
    </Modal>
  );
};
