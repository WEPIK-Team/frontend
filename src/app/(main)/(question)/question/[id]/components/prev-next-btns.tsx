import * as React from "react";

import { Button } from "@/components/ui/button";

interface IPrevNextBtnsProps {}

const PrevNextBtns: React.FunctionComponent<IPrevNextBtnsProps> = () => {
  // zustand 이동
  return (
    <div className="mx-auto mt-10 flex max-w-md gap-x-4">
      <Button className="w-full bg-wpc-light-gray text-wpc-gray" variant="gray">
        이전
      </Button>
      <Button className="w-full bg-wpc-primary text-white" variant="default">
        다음
      </Button>
    </div>
  );
};

export default PrevNextBtns;
