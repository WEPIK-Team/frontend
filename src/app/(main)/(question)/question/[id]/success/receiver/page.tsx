import Image from "next/image";

import Heading from "@/components/common/heading";
import QuestionResultButton from "@/components/question/result-button";
import SocialShare from "@/components/share/social-share";

export default function QuestionSuccessSender() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Heading as="h3" className="text-wpt-2xl font-semibold">
          답변 완료!
        </Heading>
        <p className="mt-3 p-0 text-wpt-md">
          공유하고 상대방의 답변을 받아보세요.
        </p>
        <div className="mt-[22px] flex justify-center">
          <Image
            src="/svgs/success/receiver.svg"
            className="rounded-[48px] object-cover"
            width={348}
            height={288}
            alt="receiver-success"
          />
        </div>
        <div className="m-auto mt-4 w-[358px]">
          <QuestionResultButton />
        </div>
        <div className="mt-7 h-5 w-full bg-gradient-to-t from-white to-[#F8F7FD]" />
        <div className="flex flex-col justify-center pt-12">
          <p className="m-auto p-0 text-wpt-base-1 font-medium">
            결과 같이 보기
          </p>
          <SocialShare kakaoId={109006} type="receiver" />
        </div>
      </div>
    </>
  );
}
