import React from "react";

import { getManageQuestionList } from "@/lib/api/manage-question";

import { columns } from "@/components/manage/columns";
import { DataTable } from "@/components/manage/data-table";
import ManegeQuestionHeader from "@/components/manage/manage-question-header";
import QuestionModals from "@/components/manage/question-modals";
import { Separator } from "@/components/ui/separator";

// async function getQuestionData(): Promise<IQuestion[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52",
//       title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
//       type: QuestionTypeTest.INPUT,
//       createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
//     },
//     {
//       id: "728ed51",
//       title: "셋 중 더 드랍하고 싶은 강의는?",
//       type: QuestionTypeTest.SELECT,
//       createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
//     },
//     {
//       id: "728ed52",
//       title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
//       type: QuestionTypeTest.TEXTAREA,
//       createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
//     },
//     {
//       id: "728ed52",
//       title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
//       type: QuestionTypeTest.BAR,
//       createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
//     },

//     {
//       id: "728ed52",
//       title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
//       type: QuestionTypeTest.STAR_RANK,
//       createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
//     },
//     {
//       id: "728ed52",
//       title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
//       type: QuestionTypeTest.DATE,
//       createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
//     },
//     {
//       id: "728ed52",
//       title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
//       type: QuestionTypeTest.DATE,
//       createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
//     },
//     {
//       id: "728ed52",
//       title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
//       type: QuestionTypeTest.DATE,
//       createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
//     },
//     {
//       id: "728ed52",
//       title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
//       type: QuestionTypeTest.DATE,
//       createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
//     },
//     {
//       id: "728ed52",
//       title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
//       type: QuestionTypeTest.DATE,
//       createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
//     },
//     {
//       id: "728ed52",
//       title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
//       type: QuestionTypeTest.DATE,
//       createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
//     },
//   ];
// }

export default async function ManageQuestionPage() {
  const data = await getManageQuestionList();

  return (
    <main className="py-4">
      <ManegeQuestionHeader />
      <Separator className="mb-5 mt-10" />
      <DataTable columns={columns} data={data} />
      <QuestionModals />
    </main>
  );
}
