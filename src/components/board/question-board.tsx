"use client";

import {
  BaseQuestion,
  ColumnType,
  generateQuestions,
} from "@/lib/data/question";
import { useEffect, useState } from "react";
import Column from "./question-board-column";
import { UseFormSetValue } from "react-hook-form";
import { CreateTemplateValues } from "@/lib/schema/template-schema";

interface QuestionBoardProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onQuestionSelected: UseFormSetValue<CreateTemplateValues>;
}

export default function QuestionBoard({
  onQuestionSelected,
}: QuestionBoardProps) {
  const [questions, setQuestions] = useState<BaseQuestion[]>([]);

  // TODO: fetch시 ColumnType.Unused인 column 추가
  useEffect(() => {
    const initialQuestions = generateQuestions();
    setQuestions(initialQuestions);
  }, []);

  useEffect(() => {
    const selectedQuestionIds: string[] = questions.reduce(
      (acc: string[], question) => {
        if (question.column === ColumnType.Use) {
          acc.push(question.title);
        }
        return acc;
      },
      [],
    );

    onQuestionSelected("questions", selectedQuestionIds);
  }, [questions, onQuestionSelected]);

  return (
    <div className="flex h-full w-full gap-3 py-12">
      {questions !== null && (
        <>
          <Column
            title={"사용"}
            column={ColumnType.Use}
            questions={questions}
            setQuestions={setQuestions}
          />
          <Column
            title={"미사용"}
            column={ColumnType.Unused}
            questions={questions}
            setQuestions={setQuestions}
          />
        </>
      )}
    </div>
  );
}
