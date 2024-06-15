import { getQuestionResult } from "@/lib/api/question";

import { QuestionResultCard } from "@/components/card/question-result-card";
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
        {questionResult.senderAnswers.map(
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
          <SocialShare kakaoId={108687} type="receiver" />
          <div className="m-auto mt-5 cursor-pointer text-center text-wpt-base-2 text-wpc-gray underline underline-offset-[6px]">
            다른 템플릿 보러가기
          </div>
        </div>
      </div>
    </>
  );
}
