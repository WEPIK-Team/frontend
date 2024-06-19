import { Metadata } from "next";

import { getTemplateList, getTempleteDetail } from "@/lib/api/template";

import { getMetadata } from "@/components/common/seo";
import HelpModal from "@/components/modal/help-modal";

import { initQuestions } from "@/lib/question";
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
  const { questions } = await getTempleteDetail(Number(id));

  if (!questions) throw new Error("잘못된 URL로 접속하셨습니다!");

  const generatedQuestion = initQuestions(questions);

  return (
    <QuestionStoreProvider questions={generatedQuestion}>
      {children}
      <HelpModal />
    </QuestionStoreProvider>
  );
}

export const generateMetadata = async ({
  params: { id },
}: {
  params: IPageParams;
}): Promise<Metadata> => {
  return getMetadata({
    title: `서로 알아가고 싶은 상대가 있는 사람들을 위한 문답 서비스`,
    description: `서로에게 질문을 공유하고, 답변을 기다리며 더 친해져봐요`,
    ogImage: `/images/sender_thumbnail.png`,
    asPath: `/question/${id}`,
  });
};

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
