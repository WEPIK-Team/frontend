import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const selectWrapper = `flex h-[56px] w-full items-center space-x-2 rounded-full border px- border-primary text-[15px] font-medium px-[22px]
     
    `;

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
          className={cn(selectWrapper, {
            "bg-primary text-white": selectedValues.includes(el),
            "bg-white text-black": !selectedValues.includes(el),
          })}
          onClick={() => handleSelect(el)}
        >
          {el.label}
        </li>
      ))}
    </ul>
  );
};

export default QuestionSelect;
