"use client";

import { BaseQuestion, ColumnType } from "@/lib/data/question";
import { Dispatch, DragEvent, SetStateAction, useState } from "react";
import DropIndicator from "./drop-indicator";
import Card from "./question-board-card";

interface ColumnProps {
  title: string;
  column: ColumnType;
  questions: BaseQuestion[];
  setQuestions: Dispatch<SetStateAction<BaseQuestion[]>>;
}

const Column = ({ title, questions, column, setQuestions }: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, question: BaseQuestion) => {
    e.dataTransfer?.setData("questionId", question.id);
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

  const handleClick = (questionId: string) => {
    let copy = [...questions];

    const cardToMove = copy.find((c) => c.id === questionId);
    if (!cardToMove) return;

    let columnToMoveTo = ColumnType.Unused;

    if (cardToMove.column === ColumnType.Unused) {
      columnToMoveTo = ColumnType.Use;
    }

    cardToMove.column = columnToMoveTo;

    copy = copy.filter((c) => c.id !== questionId);

    copy.push(cardToMove);

    setQuestions(copy);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const questionId = e.dataTransfer?.getData("questionId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== questionId) {
      let copy = [...questions];

      let cardToTransfer = copy.find((c) => c.id === questionId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== questionId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setQuestions(copy);
    }
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
    indicators: HTMLElement[],
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
      },
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`,
      ) as unknown as HTMLElement[],
    );
  };

  const filteredCards = questions.filter((c) => c.column === column);

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>

      <div className="h-[500px] w-80 shrink-0 overflow-y-scroll">
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`h-full w-full transition-colors ${
            active ? "bg-neutral-200/50" : "bg-neutral-300/0"
          }`}
        >
          {filteredCards.map((c) => {
            return (
              <Card
                key={c.id}
                {...c}
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
