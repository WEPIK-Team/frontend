"use client";

import Image from "next/image";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import QuestionIndexList from "./question-index-list";

const QuestionIndex = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="w-[32px]">
          <Image
            src="/images/icons/index-close.png"
            width={22}
            height={14}
            alt="qustionList"
          />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerClose
            asChild
            className="absolute right-4 top-4 cursor-pointer"
          >
            <div className="h-[28px] w-[28px] rounded-full bg-wpc-light-gray p-[10px]">
              <Image
                src="/svgs/close.svg"
                alt="closeIcon"
                width={12}
                height={12}
              />
            </div>
          </DrawerClose>
          <DrawerTitle>답변할 질문을 선택하세요.</DrawerTitle>
          <DrawerDescription>
            클릭 시 해당 질문으로 이동합니다.
          </DrawerDescription>
          <div className="w-full border-b border-b-wpc-gray/20 pt-2" />
        </DrawerHeader>
        <QuestionIndexList />
      </DrawerContent>
    </Drawer>
  );
};

export default QuestionIndex;
