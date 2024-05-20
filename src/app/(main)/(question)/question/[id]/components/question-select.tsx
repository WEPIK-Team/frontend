import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface IQuestionSelectProps {
  type: "single" | "double" | "triple";
  options: SelectOption[];
}

const QuestionSelect: React.FunctionComponent<IQuestionSelectProps> = ({
  options,
  type,
}) => {
  const [selectedValues, setSelectedValues] = useState<SelectOption[]>([]);

  const handleSelect = (option: SelectOption) => {
    switch (type) {
      case "single":
        setSelectedValues([option]);
        break;
      case "double":
        if (selectedValues.includes(option)) {
          setSelectedValues(selectedValues.filter((val) => val !== option));
        } else if (selectedValues.length < 2) {
          setSelectedValues([...selectedValues, option]);
        }
        break;
      case "triple":
        if (selectedValues.includes(option)) {
          setSelectedValues(selectedValues.filter((val) => val !== option));
        } else if (selectedValues.length < 3) {
          setSelectedValues([...selectedValues, option]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <ul className="space-y-2">
      {options.map((el) => (
        <li
          key={el.value}
          className={cn(
            "w-full cursor-pointer  rounded-full bg-white font-medium",
            selectedValues.includes(el)
              ? "div-border-gradient"
              : "border border-wpc-gray"
          )}
          onClick={() => handleSelect(el)}
        >
          <div className="flex h-[56px] items-center justify-between space-x-2 px-[22px] text-[15px]">
            {el.label}
            {selectedValues.includes(el) && (
              <Image
                src="/svgs/check-active.svg"
                width={24}
                height={24}
                alt="checkIcon"
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default QuestionSelect;
