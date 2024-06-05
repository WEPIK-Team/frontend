import { QuestionStoreProvider } from "@/provider/question-store-provider";

import { ITemplate } from "@/types/question";

interface IPageParams {
  id: string;
}

interface IPageProps {
  params: IPageParams;
  children: React.ReactNode;
}

const SERVER_URL = process.env.SERVER_URL;

export default async function MainLayout({ children, params }: IPageProps) {
  // 서버로부터 질문 데이터 받아오기
  const { id } = params;
  const { questions }: ITemplate = await fetch(`${SERVER_URL}template/${id}`)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error.message);
    });

  return (
    <QuestionStoreProvider questions={questions}>
      {children}
    </QuestionStoreProvider>
  );
}

// id에 따른 정적 경로 생성
export async function generateStaticParams(): Promise<IPageProps[]> {
  const templetes = await fetch(`${SERVER_URL}template`)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error.message);
    });

  if (!templetes) return [];

  return templetes?.map((templete: ITemplate) => ({
    id: templete.id.toString(),
  }));
}
