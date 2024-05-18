import * as React from "react";

import { Button } from "@/components/ui/button";

interface IPrevNextBtnsProps {}

const PrevNextBtns: React.FunctionComponent<IPrevNextBtnsProps> = (props) => {
  return (
    <div className="mt-[50px] flex gap-x-2">
      <Button className="bg-slate-100" variant="question" size="question">
        이전
      </Button>
      <Button
        className="bg-primary text-white"
        variant="question"
        size="question"
      >
        다음
      </Button>
    </div>
  );
};

export default PrevNextBtns;
