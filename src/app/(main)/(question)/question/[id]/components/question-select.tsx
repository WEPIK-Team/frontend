import { useState } from "react";

import SelectItem from "./select-item";

export interface SelectOption {
  label: string;
  value: string;
}

interface IQuestionSelectProps {
  type: "single" | "double" | "triple";
  options: SelectOption[];
  readonly?: boolean;
  color: "sender" | "receiver";
}

const colorVal = {
  sender: "div-sender-gradient",
  receiver: "div-receiver-gradient",
};

const QuestionSelect: React.FunctionComponent<IQuestionSelectProps> = ({
  type,
  color,
  type,
  color,
  options,
  readonly,
  readonly,
}) => {
  const [selectedValues, setSelectedValues] = useState<SelectOption[]>([]);

  const handleSelect = (option: SelectOption) => {
    if (readonly) return;
    if (readonly) return;
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
        <SelectItem
          key={el.value}
          value={el.label}
          isSelect={selectedValues.includes(el)}
          theme="default"
          onClick={() => handleSelect(el)}
        />
      ))}
    </ul>
  );
};

export default QuestionSelect;
