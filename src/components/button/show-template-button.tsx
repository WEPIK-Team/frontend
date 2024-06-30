"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ShowTemplateButton = () => {
  const router = useRouter();

  const handleMoreTemplate = () => {
    router.push("/");
  };

  return (
    <>
      <div
        className="m-auto mt-5 cursor-pointer text-center text-wpt-base-2 text-wpc-gray underline underline-offset-[6px] duration-100 hover:brightness-75"
        onClick={handleMoreTemplate}
      >
        다른 템플릿 보러가기
      </div>
    </>
  );
};

export default ShowTemplateButton;
