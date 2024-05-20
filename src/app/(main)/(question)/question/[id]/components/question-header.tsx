import Image from "next/image";

import { Button } from "@/components/ui/button";

import QuestionIndex from "../../../../../../components/index/question-index";

interface IQuestionHeaderProps {}

const QuestionHeader: React.FunctionComponent<IQuestionHeaderProps> = () => {
  return (
    <div className="fixed inset-x-0 z-[60] mx-auto flex h-[44px] max-w-3xl items-center justify-between bg-white">
      {/* back button */}
      <Button>
        <Image src="/svgs/chevron-left.svg" width={11} height={20} alt="back" />
      </Button>

      {/* logo */}
      <Image src="/images/logo.svg" width={86} height={26} alt="logo" />

      {/* menu list */}
      <QuestionIndex />
    </div>
  );
};

export default QuestionHeader;
