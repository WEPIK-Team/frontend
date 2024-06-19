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
    <nav className="fixed inset-x-0 top-0 z-[2] mx-auto max-w-3xl bg-white">
      <div className="flex h-[44px] w-full items-center justify-between px-4">
        {/* back button */}
        <Button className="bg-transparent p-0" onClick={() => router.back()}>
          <Image
            src="/svgs/chevron-left.svg"
            width={15}
            height={15}
            alt="back"
            style={{ width: 15, height: 15 }}
          />
        </Button>

        {/* logo */}
        <Button className="bg-transparent" onClick={() => router.push("/")}>
          <Image src="/svgs/logo.svg" width={86} height={26} alt="logo" />
        </Button>

        {/* menu list */}
        <QuestionIndex />
      </div>

      {/* progress bar */}
      <QuestionProgressbar />
    </nav>
  );
};

export default QuestionHeader;
