"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import * as React from "react";

import { ManageHeader } from "@/components/manage/manage-header";
import { ManageQuestionModal } from "@/components/modal/manage-question-modal";

interface IManegeQuestionHeaderProps {}

const ManegeQuestionHeader: React.FunctionComponent<
  IManegeQuestionHeaderProps
> = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <ManageQuestionModal
        mode="create"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
      />
      <div className="flex w-full items-center justify-between">
        <ManageHeader
          title="질문 관리"
          description="템플릿에 사용할 질문들을 생성하고 관리해 보세요."
          icon={
            <Image
              src="/svgs/question-nav-active.svg"
              width={22}
              height={22}
              alt="question-nav"
            />
          }
        />
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-x-[10px] rounded-full bg-wpc-primary px-[18px] py-[14px] text-wpt-md font-semibold text-white"
        >
          <PlusIcon className="h-4 w-4" />
          질문 생성
        </button>
      </div>
    </>
  );
};

export default ManegeQuestionHeader;
