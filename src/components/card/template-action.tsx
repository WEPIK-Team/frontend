"use client";

import {
  DotsVerticalIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TemplateActionProps {}

export const TemplateAction = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [questionloading, setQuestionLoading] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  //   const onCopy = (id: string) => {
  //     navigator.clipboard.writeText(id);
  //     // toast.success("클립보드에 복사 되었습니다.");
  //   };

  const onDelete = async () => {
    try {
      //   toast.success("삭제 되었습니다.");
    } catch (error) {
      //   toast.error("서버 오류가 발생하였습니다.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="gray"
            className="h-8 w-8 cursor-pointer border-0 bg-transparent p-0 shadow-none"
          >
            <span className="sr-only">메뉴 열기</span>
            <DotsVerticalIcon className="h-4 w-4 text-wpc-gray" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditIsOpen(true)}>
            <Pencil2Icon className="mr-2 h-4 w-4" />
            수정하기
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <TrashIcon className="mr-2 h-4 w-4" />
            삭제하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
