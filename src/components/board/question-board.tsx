"use client";

import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

import QuestionBoardColumn from "@/components/board/question-board-column";

import useTemplate from "@/hooks/use-template";
import { CreateTemplateValues } from "@/lib/schema/template-schema";

import { ColumnType } from "@/types/question";

interface QuestionBoardProps {
  onQuestionSelected: UseFormSetValue<CreateTemplateValues>;
}

export default function QuestionBoard({
  onQuestionSelected,
}: QuestionBoardProps) {
  const { templateQuestions, fetchUnusedQuestions } = useTemplate();

  useEffect(() => {
    fetchUnusedQuestions();
  }, [fetchUnusedQuestions]);

  useEffect(() => {
    onQuestionSelected(
      "questionIds",
      templateQuestions.usedQuestions.map((q) => q.id)
    );
  }, [templateQuestions, onQuestionSelected]);

  return (
    <div className="relative flex h-full w-full gap-[8px]">
      <QuestionBoardColumn
        title="사용"
        column={ColumnType.Use}
        questions={templateQuestions.usedQuestions}
      />
      <QuestionBoardColumn
        title="미사용"
        column={ColumnType.Unused}
        questions={templateQuestions.unUsedQuestions}
      />
    </div>
  );
}
