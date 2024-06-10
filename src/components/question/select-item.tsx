import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

import AnimatieSelectIcon from "./animate-select-icon";

interface ISelectItemProps extends React.HTMLAttributes<HTMLLIElement> {
  value: string;
  theme: "sender" | "receiver" | "default" | "both";
  isSelect?: boolean;
  onClick?: () => void;
}

const ItemTheme = {
  theme: {
    sender: "div-sender-gradient",
    receiver: "div-receiver-gradient",
    default: "div-border-gradient",
    both: "div-border-gradient",
  },
  iconPath: {
    sender: "/svgs/sender-check.svg",
    receiver: "/svgs/receiver-check.svg",
    default: "/svgs/sender-check.svg",
    both: "",
  },
};

const SelectItem: React.FunctionComponent<ISelectItemProps> = ({
  isSelect,
  theme,
  value,
  onClick,
}) => {
  return (
    <li
      className={cn(
        "relative w-full cursor-pointer rounded-full text-wpt-base-2 font-semibold transition-all ",
        isSelect ? ItemTheme.theme[theme] : "border border-wpc-gray"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between break-keep py-[17px] pl-[24px] pr-[15px]">
        <p>{value}</p>
      </div>
      {isSelect && theme !== "both" && (
        <AnimatieSelectIcon className="absolute right-[15px] top-1/2 -translate-y-1/2" />
      )}

      {isSelect && theme === "both" && (
        <div className="absolute right-[15px] top-1/2 flex -translate-y-1/2 items-center gap-x-2">
          <Image
            src={ItemTheme.iconPath["sender"]}
            width={24}
            height={24}
            alt="selectIcon"
          />
          <Image
            src={ItemTheme.iconPath["receiver"]}
            width={24}
            height={24}
            alt="selectIcon"
          />
        </div>
      )}
    </li>
  );
};

export default SelectItem;
