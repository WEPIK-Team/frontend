"use client";

import Image from "next/image";
import Link from "next/link";

import useHelpModalStore from "@/store/help-modal-store";

export default function Header() {
  const { setIsOpen } = useHelpModalStore();

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 mx-auto flex h-11 w-full border-b bg-white pl-[calc(100vw-100%)]">
        <div className="relative mx-auto flex w-full max-w-3xl items-center justify-between px-4 md:pr-8">
          <div className="h-[15px] w-[15px]" />
          <div>
            <Link href="/">
              <Image
                src="/svgs/logo.svg"
                width={86}
                height={26}
                priority
                alt="logo"
              />
            </Link>
          </div>
          <div
            className="cursor-pointer transition duration-300 hover:scale-105"
            onClick={() => setIsOpen(true)}
          >
            <Image src="/svgs/help.svg" alt="svgIcon" width={32} height={32} />
          </div>
        </div>
      </nav>
    </>
  );
}
