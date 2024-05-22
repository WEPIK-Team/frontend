import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

type Selector = "sender" | "receiver" | "none";

interface SelectOption {
  label: string;
  value: string;
  selectedBy?: Selector;
}

interface ISelectResultProps {
  options: SelectOption[];
}

const selectorObj = {
  color: {
    sender: "div-sender-gradient",
    receiver: "div-receiver-gradient",
    none: "border border-wpc-gray",
  },
  selector: {
    sender: true,
    receiver: true,
    none: false,
  },
  iconPath: {
    sender: "/svgs/sender-check.svg",
    receiver: "/svgs/receiver-check.svg",
    none: "",
  },
};

const SelectResult: React.FunctionComponent<ISelectResultProps> = ({
  options,
}) => {
  return (
    <ul className="space-y-2">
      {options &&
        options.map((el) => (
          <li
            key={el.value}
            className={cn(
              "w-full cursor-pointer rounded-full bg-white font-medium",
              selectorObj.color[el.selectedBy as Selector]
            )}
          >
            <div className="flex h-[56px] items-center justify-between space-x-2 px-[22px] text-[15px]">
              {el.label}
              {selectorObj.selector[el.selectedBy as Selector] ? (
                <Image
                  src={selectorObj.iconPath[el.selectedBy as Selector]}
                  width={24}
                  height={24}
                  alt="checkIcon"
                />
              ) : null}
            </div>
          </li>
        ))}
    </ul>
  );
};

export default SelectResult;
