"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

import Rate from "./rate";

interface IRateProps {
  id: number;
  size?: number;
}

function RatingInput({ id, size = 25 }: IRateProps) {
  const [rating, setRating] = React.useState<number | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setRating(parseFloat(e.target.value));
  };

  return (
    <div className="relative mx-auto flex w-fit flex-col items-center justify-center">
      <Rate
        size={size}
        color="#7B78EC"
        emptyColor="#DBDADE"
        rating={rating ?? 0}
        id={id}
      />
      <div className={`absolute bottom-0 left-0 top-0 m-0 w-full opacity-0 `}>
        <input
          type="range"
          onChange={onChange}
          onClick={(e) => e.stopPropagation()}
          value={rating ?? 0}
          min="0"
          max="5"
          step="0.5"
          className={cn("w-full", `h-[${size}px]`)}
        />
      </div>
      <p className="text-[17px] font-semibold text-primary">{rating}</p>
    </div>
  );
}

export default RatingInput;
