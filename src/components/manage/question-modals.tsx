"use client";

import * as React from "react";

import { deleteQuestion } from "@/lib/api/manage-question";

import { cn } from "@/lib/utils";

import { toast } from "@/components/ui/use-toast";

import useQuestionModalStore from "@/store/question-modal-store";

import { AlertModal } from "../modal/alert-modal";
import { ManageQuestionModal } from "../modal/manage-question-modal";

interface IQuestionModalsProps {}

const QuestionModals: React.FunctionComponent<IQuestionModalsProps> = () => {
  const { targetId, isDeleteOpen, isEditOpen, onClose } =
    useQuestionModalStore();

  const [alertLoading, setAlertLoading] = React.useState(false);

  const onDelete = async () => {
    if (!targetId) return;
    try {
      await deleteQuestion(targetId);
      toast({
        variant: "success",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        title: "성공적으로 삭제 되었습니다!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        title: "서버에서 오류가 발생하여 실패하였습니다.",
      });
    } finally {
      setAlertLoading(false);
      onClose("DELETE");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isDeleteOpen}
        loading={alertLoading}
        onClose={() => onClose("DELETE")}
        onConfirm={onDelete}
      />
      <ManageQuestionModal
        mode="edit"
        isOpen={isEditOpen}
        onClose={() => onClose("EDIT")}
        onConfirm={() => {}}
        questionId={targetId ?? undefined}
      />
    </>
  );
};

export default QuestionModals;
