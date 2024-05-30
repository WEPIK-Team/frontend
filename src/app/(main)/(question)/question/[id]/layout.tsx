import { faker } from "@faker-js/faker";
import { format } from "date-fns";

import { QuestionTypeTest } from "@/lib/data/select";
import { QuestionStoreProvider } from "@/provider/question-store-provider";

async function getQuestionData(): Promise<any[]> {
  return [
    {
      id: faker.string.uuid(),
      title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
      type: QuestionTypeTest.INPUT,
      content: faker.lorem.sentence(),
      imageUrl: faker.image.url(),
      createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
    },
    {
      id: faker.string.uuid(),
      title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
      type: QuestionTypeTest.TEXTAREA,
      imageUrl: faker.image.url(),
      content: faker.lorem.text(),
      createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
    },
    {
      id: faker.string.uuid(),
      title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
      type: QuestionTypeTest.BAR,
      imageUrl: faker.image.url(),
      content: 65,
      createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
    },
    {
      id: faker.string.uuid(),
      title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
      type: QuestionTypeTest.DATE,
      content: "2024/05/16 - 2024/05/18",
      createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
    },
    {
      id: faker.string.uuid(),
      title: "셋 중 더 드랍하고 싶은 강의는?",
      type: QuestionTypeTest.SELECT,
      imageUrl: faker.image.url(),
      content: "",
      selects: [
        {
          label: "불시에 기습 과제 날리는 교수님",
          value: "test123124",
          isSelect: false,
        },
        {
          label: "한 주도 빠짐 없이 과제 내주는 교수님",
          value: "test12412412",
          isSelect: false,
        },
        {
          label: "수업 때 잡담만 하는데 시험 어렵게 내는 교수님",
          value: "test231",
          isSelect: false,
        },
      ],
      createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
    },
    {
      id: faker.string.uuid(),

      title: "그 사람을 처음 마주했을 때 당신의 감정을 표현해 보세요.",
      type: QuestionTypeTest.STAR_RANK,
      imageUrl: faker.image.url(),
      content: 2.5,
      createAt: format(faker.date.anytime(), "yyyy년 MM월 dd일 HH:mm"),
    },
  ];
}

export default async function MAinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 서버로부터 질문 데이터 받아오기
  const data = await getQuestionData();

  return (
    <QuestionStoreProvider questions={data}>{children}</QuestionStoreProvider>
  );
}
