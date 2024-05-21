"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "@/components/ui/button";

import { Heading } from "./heading";
import { ManageQuestionModal } from "./manage-question-modal";

interface IManegeQuestionHeaderProps {}

const ManegeQuestionHeader: React.FunctionComponent<
  IManegeQuestionHeaderProps
> = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onCreate = async () => {};

  return (
    <>
      <ManageQuestionModal
        mode="create"
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
      />
      <div className="flex w-full items-center justify-between">
        <Heading
          title="질문 관리"
          description="템플릿에 사용할 질문들을 생성하고 관리해 보세요."
        />
        <Button
          onClick={() => setOpen(true)}
          className="h-fit rounded-md bg-black px-4 py-2"
        >
          <PlusIcon className="h-4 w-4" /> Add New
        </Button>
      </div>
    </>
  );
};

export default ManegeQuestionHeader;
