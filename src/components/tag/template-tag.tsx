"use client";

import { useState } from "react";

import AnimateCheckIcon from "@/components/icon/animate-check-icon";

export function TemplateTag({ label }: { label: string }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };
  return (
    <>
      <button
        className={`flex items-center space-x-1 rounded-2xl border-[1px] border-solid bg-white px-[10px] py-[5px] text-wpt-base-1 ${
          active
            ? "border-[1.25px] border-wpc-primary text-wpt-base-1 font-semibold text-wpc-primary"
            : "border-wpc-gray3 text-wpc-gray"
        }`}
        onClick={handleClick}
      >
        {active && <AnimateCheckIcon />}
        <p className="text-nowrap">{label}</p>
      </button>
    </>
  );
}
