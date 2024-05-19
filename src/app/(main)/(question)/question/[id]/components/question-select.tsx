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
        <div
          key={el.value}
          className={cn("overflow-hidden rounded-full p-[1px] transition-all", {
            "bg-wpc-primary-grad": selectedValues.includes(el),
            "hover:bg-wpc-primary-grad": !selectedValues.includes(el),
          })}
        >
          <li
            className={cn(
              "flex h-[56px] w-full cursor-pointer items-center justify-between space-x-2 rounded-full bg-white px-[22px] text-[15px] font-medium transition-all",
              {
                "": selectedValues.includes(el),
                "border border-wpc-gray hover:border-none":
                  !selectedValues.includes(el),
              }
            )}
            onClick={() => handleSelect(el)}
          >
            {el.label}
            {selectedValues.includes(el) && (
              <Image
                src="/svgs/check-active.svg"
                width={24}
                height={24}
                alt="checkIcon"
              />
            )}
          </li>
        </div>
      ))}
    </ul>
  );
};

export default QuestionSelect;
