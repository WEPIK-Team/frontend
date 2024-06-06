import { getTemplateList, getTempleteDetail } from "@/lib/api/template";

import { QuestionStoreProvider } from "@/provider/question-store-provider";

import { Template } from "@/types/template";

interface IPageParams {
  id: string;
}

interface IPageProps {
  params: IPageParams;
  children: React.ReactNode;
}

export default async function MainLayout({ children, params }: IPageProps) {
  const { id } = params;
  const { questions } = await getTempleteDetail(id);

  if (!questions) throw new Error("잘못된 URL로 접속하셨습니다!");

  return (
    <QuestionStoreProvider questions={questions}>
      {children}
    </QuestionStoreProvider>
  );
}

export async function generateStaticParams(): Promise<IPageParams[]> {
  const templetes = await getTemplateList().catch((error) => {
    throw new Error(error.message);
  });

  if (!templetes || !templetes.length) return [];

  const templeteIds = templetes.map((templete: Template) => ({
    id: templete.id.toString(),
  }));

  return templeteIds;
}
