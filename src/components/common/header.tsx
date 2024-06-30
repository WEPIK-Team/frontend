"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import QuestionIndex from "@/components/index/question-index";
import QuestionProgressbar from "@/components/input/question-progressbar";

import useHelpModalStore from "@/store/help-modal-store";

type HeaderProps = {
  showBackButton?: boolean;
  showHelpButton?: boolean;
  showProgressBar?: boolean;
  showQuestionIndex?: boolean;
};

export default function Header({
  showBackButton,
  showHelpButton,
  showProgressBar,
  showQuestionIndex,
}: HeaderProps) {
  const { setIsOpen } = useHelpModalStore();
  const router = useRouter();

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 mx-auto flex h-11 w-full border-b bg-white pl-[calc(100vw-100%)]">
        <div className="relative mx-auto flex w-full max-w-3xl items-center justify-between px-4">
          <div className="flex w-1/3 items-center justify-start">
            {showBackButton ? (
              <div className="flex h-[20px] w-[20px] items-center">
                <Image
                  src="/images/icons/chevron-left.png"
                  onClick={() => router.back()}
                  className="cursor-pointer"
                  width={9.13}
                  height={15.9}
                  alt="backIcon"
                />
              </div>
            ) : (
              <div className="h-[20px] w-[20px]" />
            )}
          </div>

          <div className="flex w-1/3 justify-center">
            <Link href="/">
              <Image
                src="/images/logo.png"
                width={86}
                height={26}
                alt="logo"
                className="object-cover"
              />
            </Link>
          </div>

          <div className="flex w-1/3 items-center justify-end">
            {showHelpButton && (
              <div
                className="w-[32px] cursor-pointer transition duration-300 hover:scale-105"
                onClick={() => setIsOpen(true)}
              >
                <Image src="/svgs/help.svg" alt="help" width={32} height={32} />
              </div>
            )}

            {showQuestionIndex && <QuestionIndex />}

            {!showHelpButton && !showQuestionIndex && (
              <div className="w-[32px]" />
            )}
          </div>
        </div>

        {showProgressBar && <QuestionProgressbar />}
      </nav>
    </>
  );
}
