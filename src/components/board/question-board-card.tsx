import { motion } from "framer-motion";
import { DragEvent } from "react";

import { cn } from "@/lib/utils";

import DropIndicator from "./drop-indicator";
import InputTag from "../tag/input-tag";

import { ColumnType, IQuestion } from "@/types/question";

export interface CardProps {
  question: IQuestion;
  column: ColumnType;
  handleDragStart: (e: DragEvent<HTMLDivElement>, question: IQuestion) => void;
  handleClick: (questionId: number) => void;
}

const QuestionBoardCard = ({
  question,
  column,
  handleDragStart,
  handleClick,
}: CardProps) => {
  const id = String(question.id);

  const handleCardClick = () => {
    handleClick(question.id);
  };

  const columnClass = column === ColumnType.Use ? "bg-white" : "bg-neutral-50";

  return (
    <>
      <DropIndicator beforeId={id} column={column} />

      <motion.div layout layoutId={id}>
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(e, question)}
          onClick={handleCardClick}
          className={cn(
            "flex cursor-grab items-center justify-between gap-[10px] rounded-[12px] border-[0.8px] border-wpc-primary p-2 active:cursor-grabbing",
            columnClass
          )}
        >
          <p className="text-sm">{question.title}</p>
          <InputTag tagType={question.type} />
        </div>
      </motion.div>
    </>
  );
};

export default QuestionBoardCard;
