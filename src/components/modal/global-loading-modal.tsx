"use client";

import Image from "next/image";
import * as React from "react";

import useGlobalLoadingModalStore from "@/store/global-loading-modal-store";

interface ILoadingModalProps {
  title: string;
  description: string;
}

const GlobalLoadingModal: React.FunctionComponent<ILoadingModalProps> = ({
  title,
  description,
}) => {
  const { isOpen } = useGlobalLoadingModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] mx-auto flex max-w-[768px] items-center justify-center bg-black/35">
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        <Image
          src="/gifs/loading.gif"
          width={324}
          height={324}
          alt="loading"
          priority
        />
        <h1 className="text-wpt-xl font-bold">{title}</h1>
        <h2 className="">{description}</h2>
      </div>
    </div>
  );
};

export default GlobalLoadingModal;
