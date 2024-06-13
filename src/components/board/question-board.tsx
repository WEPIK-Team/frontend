"use client";

import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import { getManageQuestionList } from "@/lib/api/manage-question";

import { StepTwoData } from "@/lib/schema/template-schema";

import Column from "./question-board-column";

import { ColumnType, IQuestion } from "@/types/question";

interface QuestionState {
  used: IQuestion[];
  unused: IQuestion[];
}

interface QuestionBoardProps {
  onQuestionSelected: UseFormSetValue<StepTwoData>;
}

export type SetQuestionsType = React.Dispatch<
  React.SetStateAction<QuestionState>
>;

export default function QuestionBoard({
  onQuestionSelected,
}: QuestionBoardProps) {
  const [questions, setQuestions] = useState<QuestionState>({
    used: [],
    unused: [],
  });

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const initialQuestions = await getManageQuestionList();
        setQuestions({ used: [], unused: initialQuestions });
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const usedQuestionIds: number[] = questions.used.reduce(
      (acc: number[], question) => {
        if (question) {
          acc.push(question.id);
        }
        return acc;
      },
      []
    );

    onQuestionSelected("questionIds", usedQuestionIds);
  }, [questions, onQuestionSelected]);

  return (
    <div className="relative flex h-full w-full gap-[8px]">
      <Column
        title="사용"
        column={ColumnType.Use}
        questions={questions.used}
        setQuestions={setQuestions}
      />
      <Column
        title="미사용"
        column={ColumnType.Unused}
        questions={questions.unused}
        setQuestions={setQuestions}
      />
    </div>
  );
}
