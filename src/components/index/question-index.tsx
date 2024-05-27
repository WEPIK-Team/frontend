"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Questions } from "@/constants/dump";

import IndexItem from "./index-item";

const QuestionIndex = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-transparent">
          <Image
            src="/svgs/menu.svg"
            width={22}
            height={14}
            alt="qustion-list"
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerClose asChild className="absolute right-4 top-4">
            <Image
              src="/svgs/index-close.svg"
              width={22}
              height={14}
              alt="qustion-list"
            />
          </DrawerClose>
          <DrawerTitle>답변할 질문을 선택하세요.</DrawerTitle>
          <DrawerDescription>
            클릭 시 해당 질문으로 이동합니다.
          </DrawerDescription>
          <div className="w-full border-b border-b-wpc-gray pt-2" />
        </DrawerHeader>
        <ul className="flex flex-col gap-[11px] overflow-y-scroll px-[16px] py-[1px]">
          {Questions.map((question, idx) => (
            <IndexItem
              key={question.title}
              title={question.title}
              isAnswer={question.isAnswer}
              isSelected={question.isSelected}
              idx={idx}
            />
          ))}
        </ul>
        <Button className="mx-[16px] my-[17px] py-4 text-white">이동</Button>
      </DrawerContent>
    </Drawer>
  );
};

export default QuestionIndex;
