import { motion } from "framer-motion";
import { DragEvent } from "react";

import { cn } from "@/lib/utils";

import { BaseQuestion, ColumnType } from "@/lib/data/question";

import DropIndicator from "./drop-indicator";

export interface CardProps extends BaseQuestion {
  handleDragStart: (
    e: DragEvent<HTMLDivElement>,
    question: BaseQuestion
  ) => void;
  handleClick: (questionId: string) => void;
}

const QuestionBoardCard = ({
  id,
  title,
  column,
  type,
  handleDragStart,
  handleClick,
}: CardProps) => {
  const handleCardClick = () => {
    handleClick(id);
  };

  const columnClass = column === ColumnType.Use ? "bg-white" : "bg-neutral-50";

  return (
    <>
      <DropIndicator beforeId={id} column={column} />

      <motion.div layout layoutId={id}>
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(e, { id, title, column, type })}
          onClick={handleCardClick}
          className={cn(
            "cursor-grab rounded border border-wpc-primary p-2 active:cursor-grabbing",
            columnClass
          )}
        >
          <p className="text-sm">{title}</p>
        </div>
      </motion.div>
    </>
  );
};

export default QuestionBoardCard;
