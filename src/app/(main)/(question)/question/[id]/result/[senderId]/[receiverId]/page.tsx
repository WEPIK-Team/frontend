import { Metadata } from "next";

import { getQuestionResult } from "@/lib/api/question";

import ShowTemplateButton from "@/components/button/show-template-button";
import { QuestionResultCard } from "@/components/card/question-result-card";
import { getMetadata } from "@/components/common/seo";
import SocialShare from "@/components/share/social-share";

import { QuestionAnswer } from "@/types/question";

type QuestionResultProps = {
  params: {
    senderId: string;
    receiverId: string;
  };
};

export default async function QuestionResult({ params }: QuestionResultProps) {
  const questionResult = await getQuestionResult({
    senderId: params.senderId,
    receiverId: params.receiverId,
  });

  return (
    <>
      <div className="flex flex-col justify-start gap-5">
        {questionResult.senderAnswers?.map(
          (senderAnswer: QuestionAnswer, index: number) => (
            <div key={`question_result_${index}`}>
              <QuestionResultCard
                index={index + 1}
                senderAnswer={senderAnswer}
                receiverAnswer={questionResult.receiverAnswers[index]}
              />
            </div>
          )
        )}
      </div>
      <div className="mb-[120px] flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center pt-12">
          <SocialShare kakaoId={109006} type="receiver" result={params} />
          <ShowTemplateButton />
        </div>
      </div>
    </>
  );
}

export const generateMetadata = async ({
  params,
}: QuestionResultProps): Promise<Metadata> => {
  return getMetadata({
    title: `서로 알아가고 싶은 상대가 있는 사람들을 위한 문답 서비스`,
    description: `서로에게 질문을 공유하고, 답변을 기다리며 더 친해져봐요`,
    ogImage: `/images/receiver_thumbnail.png`,
    asPath: `/question/${params.senderId}/${params.receiverId}`,
  });
};
