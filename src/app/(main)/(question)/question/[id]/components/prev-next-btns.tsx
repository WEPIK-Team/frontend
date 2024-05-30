"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

interface IPrevNextBtnsProps {
  onPrev?: () => void;
}

const PrevNextBtns: React.FunctionComponent<IPrevNextBtnsProps> = ({
  onPrev,
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
      <Button variant="default" type="submit" className="w-full">
        다음
      </Button>
    </div>
  );
};

export default PrevNextBtns;
