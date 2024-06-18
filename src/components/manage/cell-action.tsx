import {
  DotsHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useQuestionModalStore from "@/store/question-modal-store";

import { IQuestion } from "@/types/question";

interface CellActionProps {
  data: IQuestion;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { onOpen, setTargetId } = useQuestionModalStore();

  //   const onCopy = (id: string) => {
  //     navigator.clipboard.writeText(id);
  //     // toast.success("클립보드에 복사 되었습니다.");
  //   };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="gray"
            className="h-8 w-8 cursor-pointer border-0 bg-transparent p-0 shadow-none"
          >
            <span className="sr-only">메뉴 열기</span>
            <DotsHorizontalIcon className="h-4 w-4 text-wpc-gray" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              onOpen("EDIT");
              setTargetId(data.id);
            }}
          >
            <Pencil2Icon className="mr-2 h-4 w-4" />
            수정하기
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onOpen("DELETE");
              setTargetId(data.id);
            }}
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            삭제하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
