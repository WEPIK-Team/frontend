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
    <div className="relative mx-auto w-fit ">
      <Rate
        size={size}
        color="#7B78EC"
        emptyColor="#DBDADE"
        rating={rating ?? 0}
        id={id}
      />
      <div className="absolute  bottom-0 left-0 top-0 w-full opacity-0">
        <input
          type="range"
          onChange={onChange}
          onClick={(e) => e.stopPropagation()}
          value={rating ?? 0}
          min="0"
          max="5"
          step="0.5"
          className={cn(`h-full w-full`)}
        />
      </div>
      <p className="text-center text-[17px] font-semibold text-wpc-primary">
        {rating}
      </p>
    </div>
  );
}

export default RatingInput;