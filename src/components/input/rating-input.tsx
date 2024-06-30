"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import Rate from "@/components/question/rate";

interface IRateProps {
  id: number;
  size?: number;
  readOnly?: boolean;
  emptyColor?: string;
  theme?: "sender" | "receiver" | "default";
  value?: number;
  onRateChange?: (value: number) => void;
}

const themeObj = {
  color: {
    sender: {
      from: "#7B78EC",
      to: "#6377DD",
    },
    receiver: {
      from: "#D19BEB",
      to: "#A188EC",
    },
    default: {
      from: "#7B78EC",
      to: "#7B78EC",
    },
  },
  emptyColor: "#DBDADE",
};

function RatingInput({
  id,
  value = 0,
  size = 25,
  theme = "default",
  readOnly,
  emptyColor = "#DBDADE",
  onRateChange,
}: IRateProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (onRateChange) {
      onRateChange(parseFloat(e.target.value));
    }

    if (onRateChange) {
      onRateChange(parseFloat(e.target.value));
    }
  };

  return (
    <div className="relative w-fit">
      <Rate
        size={size}
        color={themeObj.color[theme]}
        emptyColor={emptyColor}
        rating={value}
        id={id}
      />
      <div className="absolute bottom-0 left-0 top-0 w-full opacity-0">
        <input
          type="range"
          onChange={onChange}
          onClick={(e) => e.stopPropagation()}
          value={value ?? 0}
          min="0"
          max="5"
          step="0.5"
          className={cn(`h-full w-full`)}
          disabled={readOnly}
        />
      </div>
    </div>
  );
}

export default RatingInput;
