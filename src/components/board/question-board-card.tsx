import { motion } from "framer-motion";
import { DragEvent } from "react";

import { BaseQuestion } from "@/lib/data/question";

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

  return (
    <>
      <DropIndicator beforeId={id} column={column} />

      <motion.div layout layoutId={id}>
        <div
          draggable="true"
          onDragStart={(e) => handleDragStart(e, { id, title, column, type })}
          onClick={handleCardClick}
          className="cursor-grab rounded border border-neutral-300/70 bg-neutral-200 p-3 active:cursor-grabbing"
        >
          <p className="text-sm">{title}</p>
        </div>
      </motion.div>
    </>
  );
};

export default QuestionBoardCard;
