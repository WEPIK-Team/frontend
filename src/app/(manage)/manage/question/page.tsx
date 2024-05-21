import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import React from "react";

import { Separator } from "@/components/ui/separator";

import { columns, IQuestion } from "./components/columns";
import { DataTable } from "./components/data-table";
import ManegeQuestionHeader from "./components/manage-question-header";

async function getData(): Promise<IQuestion[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed51",
      title: "셋 중 더 드랍하고 싶은 강의는?",
      type: "select",
      createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
    },
    {
      id: "728ed52",
      title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
      type: "textArea",
      createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
    },
    {
      id: "728ed53",
      title: "당신이 생각하는 우리는 얼만큼 닮았나요?",
      type: "progress",
      createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
    },
  ];
}

export default async function ManageQuestionPage() {
  const data = await getData();

  return (
    <>
      <ManegeQuestionHeader />
      <Separator className="mb-5 mt-10" />
      <DataTable searchKey="type" columns={columns} data={data} />
    </>
  );
}
