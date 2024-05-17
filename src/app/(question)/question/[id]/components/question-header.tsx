import Image from "next/image";

import { Button } from "@/components/ui/button";

import LeftBtnSVG from "../../.././../../../public/svgs/chevron-left.svg";

interface IQuestionHeaderProps {}

const QuestionHeader: React.FunctionComponent<IQuestionHeaderProps> = (
  props
) => {
  return (
    <header className="flex items-center justify-between">
      {/* back button */}
      <Button size="icon" variant="link">
        <Image src={LeftBtnSVG} width={11} height={20} alt="back" />
      </Button>

      {/* logo */}
      <Image src="/svgs/logo.svg" width={80} height={22} alt="logo" />

      {/* menu list */}
      <Button size="icon" variant="link">
        <Image src="/svgs/menu.svg" width={22} height={14} alt="qustion-list" />
      </Button>
    </header>
  );
};

export default QuestionHeader;
