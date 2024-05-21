"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import Rate from "./rate";

interface IRateProps {
  id: number;
  size?: number;
  readonly?: boolean;
  emptyColor?: string;
  color?: "sender" | "receiver" | "default";
  value?: number;
  onRateChange?: (value: number) => void;
}

const colorObj = {
  color: {
    sender: {
      from: "#7B78EC",
      to: "#6377DD",
    },
    receiver: {
      from: "#D19BEB",
      to: "#A188EC",
    },
    default: "#7B78EC",
  },
  emptyColor: "#DBDADE",
};

function RatingInput({
  id,
  value = 0,
  size = 25,
  color = "default",
  readonly,
  emptyColor = "#DBDADE",
  onRateChange,
}: IRateProps) {
  const selectedColor = colorObj.color[color] || colorObj.color.default;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (onRateChange) {
      onRateChange(parseFloat(e.target.value));
    }
  };

  return (
    <div className="relative mx-auto w-fit ">
      <Rate
        size={size}
        color={selectedColor}
        emptyColor={emptyColor}
        rating={value}
        id={id}
      />
      <div className="absolute  bottom-0 left-0 top-0 w-full opacity-0">
        <input
          type="range"
          onChange={onChange}
          onClick={(e) => e.stopPropagation()}
          value={value ?? 0}
          min="0"
          max="5"
          step="0.5"
          className={cn(`h-full w-full`)}
          disabled={readonly}
        />
      </div>
      <p className="text-center text-[17px] font-semibold text-wpc-primary">
        {value}
      </p>
    </div>
  );
}

export default RatingInput;
