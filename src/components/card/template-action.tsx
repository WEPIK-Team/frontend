"use client";

import {
  DotsVerticalIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

import { deleteTemplate } from "@/app/(manage)/manage/template/actions";

interface TemplateActionProps {
  id: number;
}

export const TemplateAction = ({ id }: TemplateActionProps) => {
  const [open, setOpen] = useState(false);

  const [alertLoading, setAlertLoading] = useState(false);

  const onDelete = async () => {
    if (!id) return;
    try {
      await deleteTemplate(id);
      toast({
        variant: "success",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        title: "성공적으로 삭제 되었습니다!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        title: "서버에서 오류가 발생하여 실패하였습니다.",
      });
    } finally {
      setAlertLoading(false);
      setOpen(false);
    }
  };

  const onDeleteOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={alertLoading}
        onClose={() => setOpen(false)}
        propagation
        onConfirm={onDelete}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="gray"
            className="z-30 h-8 w-8 cursor-pointer border-0 bg-transparent p-0 shadow-none"
          >
            <span className="sr-only">메뉴 열기</span>
            <DotsVerticalIcon className="h-4 w-4 text-wpc-gray" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/manage/template/edit/${id}`}>
              <Pencil2Icon className="mr-2 h-4 w-4" />
              수정하기
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDeleteOpen}>
            <TrashIcon className="mr-2 h-4 w-4" />
            삭제하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
