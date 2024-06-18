import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";

import useQuestion from "@/hooks/use-question";

import IndexItem from "./index-item";

const QuestionIndexList = () => {
  const { questions, moveIndexQuestion } = useQuestion();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const NOT_SELECT = selectedIdx === null || selectedIdx === undefined;

  const handleSelect = (idx: number) => {
    setSelectedIdx((prevIdx) => (prevIdx === idx ? null : idx));
  };

  const handleMoveToQuestion = (e: React.MouseEvent) => {
    if (NOT_SELECT) {
      e.preventDefault();
      return;
    }

    moveIndexQuestion(selectedIdx);
  };

  return (
    <>
      <ul className="flex h-full flex-col gap-[11px] overflow-y-scroll px-[16px] py-[2px]">
        {questions.map((question, idx) => (
          <IndexItem
            key={question.title}
            title={question.title}
            content={question.content}
            isSelected={idx === selectedIdx}
            idx={idx}
            onSelect={() => handleSelect(idx)}
          />
        ))}
      </ul>
      <DrawerClose asChild>
        <Button
          disabled={NOT_SELECT}
          className="mx-[16px] my-[17px] py-4 text-white"
          onClick={handleMoveToQuestion}
        >
          이동
        </Button>
      </DrawerClose>
    </>
  );
};

export default QuestionIndexList;
