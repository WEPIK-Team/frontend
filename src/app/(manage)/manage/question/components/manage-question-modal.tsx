"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/modal/modal";
import { Button } from "@/components/ui/button";

import QuestionForm from "./question-form";

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
        <Button disabled={loading} onClick={onClose}>
          취소
        </Button>
        <Button disabled={loading} onClick={onConfirm}>
          {buttonConfirm}
        </Button>
      </div>
    </Modal>
  );
};
