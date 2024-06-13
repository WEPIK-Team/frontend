"use client";

import { DragEvent, useState } from "react";

import DropIndicator from "./drop-indicator";
import { SetQuestionsType } from "./question-board";
import QuestionBoardCard from "./question-board-card";
import Heading from "../common/heading";

import { ColumnType, IQuestion } from "@/types/question";

interface ColumnProps {
  title: string;
  column: ColumnType;
  questions: IQuestion[];
  setQuestions: SetQuestionsType;
}

const Column = ({ title, questions, column, setQuestions }: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, question: IQuestion) => {
    e.dataTransfer?.setData("questionId", String(question.id));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const handleClick = (questionId: number) => {
    setQuestions((prevQuestions) => {
      const used = [...prevQuestions.used];
      const unused = [...prevQuestions.unused];

      let cardToMove;
      let sourceArray, destinationArray;

      if (used.some((q) => q.id === questionId)) {
        sourceArray = used;
        destinationArray = unused;
      } else if (unused.some((q) => q.id === questionId)) {
        sourceArray = unused;
        destinationArray = used;
      } else {
        return prevQuestions;
      }

      const questionIndex = sourceArray.findIndex((q) => q.id === questionId);
      if (questionIndex === -1) return prevQuestions;

      // eslint-disable-next-line prefer-const
      [cardToMove] = sourceArray.splice(questionIndex, 1);

      destinationArray.push(cardToMove);

      return {
        used,
        unused,
      };
    });
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const questionId = e.dataTransfer?.getData("questionId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    setQuestions((prevQuestions) => {
      const used = [...prevQuestions.used];
      const unused = [...prevQuestions.unused];

      let question = null;

      const findAndRemoveQuestion = (list: IQuestion[], id: string) => {
        const index = list.findIndex((q) => String(q.id) === id);
        return index !== -1 ? list.splice(index, 1)[0] : null;
      };

      question =
        findAndRemoveQuestion(used, questionId) ||
        findAndRemoveQuestion(unused, questionId);

      if (question && before !== questionId) {
        const insertIndex = used.findIndex((q) => String(q.id) === before);
        if (insertIndex === -1) {
          used.push(question);
        } else {
          used.splice(insertIndex, 0, question);
        }
      }

      return { used, unused };
    });
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els ?? getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (
    e: DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  return (
    <div className="flex w-full grow flex-col">
      <div className="mb-3 flex items-center justify-between">
        <Heading
          as="h2"
          className="text-wpt-base-2 font-medium text-wpc-primary"
        >
          {title}
        </Heading>
        <span className="rounded text-wpt-sm text-neutral-400">
          {questions.length}
        </span>
      </div>

      <div className="h-[400px] shrink-0 overflow-y-scroll rounded-[18px] bg-[#F8F7FD] p-[11px]">
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`h-full w-full transition-colors ${
            active ? "bg-neutral-200/50" : "bg-neutral-300/0"
          }`}
        >
          {questions?.map((question) => {
            return (
              <QuestionBoardCard
                key={question.id}
                column={column}
                question={question}
                handleDragStart={handleDragStart}
                handleClick={handleClick}
              />
            );
          })}
          <DropIndicator column={column} beforeId={null} />
        </div>
      </div>
    </div>
  );
};

export default Column;
