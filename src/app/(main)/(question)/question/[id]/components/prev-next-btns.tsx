"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

interface IPrevNextBtnsProps {
  onPrev?: () => void;
  onNext?: () => void;
  isMax?: boolean;
}

const PrevNextBtns: React.FunctionComponent<IPrevNextBtnsProps> = ({
  onPrev,
  onNext,
  isMax,
}) => {
  return (
    <div className="mx-auto mt-10 flex w-full gap-x-4">
      <Button
        type="button"
        onClick={onPrev}
        className="w-full bg-wpc-light-gray text-wpc-gray"
        variant="gray"
      >
        이전
      </Button>
      <Button
        onClick={onNext}
        variant="default"
        type="button"
        className="w-full"
      >
        {isMax ? "완료" : "다음"}
      </Button>
    </div>
  );
};

export default PrevNextBtns;
