import { cn } from "@/lib/utils";

import { QuestionType } from "@/types/question";

interface InputTagProps {
  tagType: QuestionType;
}

const typeColor = {
  INPUT: "#F693E7",
  SELECT: "#8076EC",
  TEXTAREA: "#35DFC0",
  BAR: "#ED666E",
  STAR_RANK: "#F8B76B",
  DATE: "#5FA3F3",
};

const InputTag = ({ tagType }: InputTagProps) => {
  return (
    <div
      style={{
        backgroundColor: typeColor[tagType],
      }}
      className={cn("w-fit rounded-full p-[6px] text-[10px]  text-white")}
    >
      {tagType}
    </div>
  );
};

export default InputTag;
