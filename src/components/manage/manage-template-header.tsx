"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import * as React from "react";

import { ManageTemplateModal } from "./manage-template-modal";
import { ManageHeader } from "../question/components/manage-header";

interface IManegeQuestionHeaderProps {}

const ManegeTemplateHeader: React.FunctionComponent<
  IManegeQuestionHeaderProps
> = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <ManageTemplateModal
        mode="create"
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
      />
      <div className="flex w-full items-center justify-between">
        <ManageHeader
          title="템플릿 관리"
          description="템플릿을 생성하고 관리해 보세요."
          icon={
            <Image
              src="/svgs/template-nav-active.svg"
              width={22}
              height={22}
              alt="template-nav"
            />
          }
        />
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-x-[10px] rounded-full bg-wpc-primary px-[18px] py-[14px] text-wpt-md font-semibold text-white"
        >
          <PlusIcon className="h-4 w-4" />
          템플릿 생성
        </button>
      </div>
    </>
  );
};

export default ManegeTemplateHeader;
