import Image from "next/image";

import { Button } from "@/components/ui/button";
import QuestionProgressbar from "./question-progressbar";

interface IQuestionHeaderProps {}

const QuestionHeader: React.FunctionComponent<IQuestionHeaderProps> = () => {
  return (
    <div className="fixed inset-x-0 z-[60] mx-auto max-w-3xl bg-white ">
      <div className="flex h-[44px] w-full items-center justify-between">
        {/* back button */}
        <Button size="icon" variant="link">
          <Image
            src="/svgs/chevron-left.svg"
            width={11}
            height={20}
            alt="back"
          />
        </Button>

        {/* logo */}
        <Image src="/images/logo.svg" width={86} height={26} alt="logo" />

        {/* menu list */}
        <Button size="icon" variant="link">
          <Image
            src="/svgs/menu.svg"
            width={22}
            height={14}
            alt="qustion-list"
          />
        </Button>
      </div>
      <QuestionProgressbar />
    </div>
  );
};

export default QuestionHeader;
