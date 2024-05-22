"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function TemplateTag({ label }: { label: string }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };
  return (
    <>
      <button
        className={`flex items-center space-x-1 rounded-2xl border-[1px] border-solid bg-white px-3 py-1 text-[15px] transition-colors duration-300 ${
          active
            ? "border-[#6377DD] font-semibold text-[#6377DD]"
            : "border-[#CCCAD1] text-[#CCCAD1]"
        }`}
        onClick={handleClick}
      >
        {active && <CheckIcon className="h-5 w-5" />}
        <p className="text-nowrap">{label}</p>
      </button>
    </>
  );
}
