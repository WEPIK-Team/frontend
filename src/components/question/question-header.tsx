"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import QuestionIndex from "@/components/index/question-index";
import { Button } from "@/components/ui/button";

import QuestionProgressbar from "../input/question-progressbar";

interface IQuestionHeaderProps {}

const QuestionHeader: React.FunctionComponent<IQuestionHeaderProps> = () => {
  const router = useRouter();
  return (
    <div className="fixed inset-x-0 top-0 z-[60] mx-auto max-w-3xl bg-white">
      <div className="flex h-[44px] w-full items-center justify-between">
        {/* back button */}
        <Button className="bg-transparent" onClick={() => router.back()}>
          <Image
            src="/svgs/chevron-left.svg"
            width={11}
            height={20}
            alt="back"
          />
        </Button>

        {/* logo */}
        <Image src="/svgs/logo.svg" width={86} height={26} alt="logo" />

        {/* menu list */}
        <QuestionIndex />
      </div>

      {/* progress bar */}
      <QuestionProgressbar />
    </div>
  );
};

export default QuestionHeader;
