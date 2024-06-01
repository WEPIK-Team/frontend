import { cn } from "@/lib/utils";

import { QuestionTypeTest } from "@/lib/data/select";

interface InputTagProps {
  tagType: QuestionTypeTest;
}

const typeColor = {
  input: "#F693E7",
  textarea: "#8076EC",
  select: "#35DFC0",
  bar: "#ED666E",
  stars: "#F8B76B",
  date: "#5FA3F3",
};

const InputTag = ({ tagType }: InputTagProps) => {
  return (
    <div
      style={{
        backgroundColor: typeColor[tagType],
      }}
      className={cn(
        "text-wpt-xs w-fit rounded-full px-[13px] pb-[9px] pt-[7px] font-semibold text-white"
      )}
    >
      {tagType}
    </div>
  );
};

export default InputTag;
