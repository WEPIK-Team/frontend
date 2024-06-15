"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { ManageHeader } from "./manage-header";

interface IManegeQuestionHeaderProps {}

const ManegeTemplateHeader: React.FunctionComponent<
  IManegeQuestionHeaderProps
> = () => {
  return (
    <>
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
        <Link
          href="/manage/template/create"
          className="flex items-center gap-x-[10px] rounded-full bg-wpc-primary px-[18px] py-[14px] text-wpt-md font-semibold text-white"
        >
          <PlusIcon className="h-4 w-4" />
          템플릿 생성
        </Link>
      </div>
    </>
  );
};

export default ManegeTemplateHeader;
