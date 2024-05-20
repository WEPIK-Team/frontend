import { faker } from "@faker-js/faker";
import Image from "next/image";

import Heading from "@/components/common/heading";

import { Icons } from "@/constants/data";

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
            src={faker.image.urlLoremFlickr()}
            className="rounded-[48px] object-cover"
            width={358}
            height={300}
            alt="sample"
          />
        </div>
        <div className="flex flex-col justify-center pt-12">
          <p className="m-auto p-0 text-wpt-base-1 font-semibold">
            상대방에게 답변 받기
          </p>
          <div className="flex gap-3 pt-4">
            {Icons.map((icon) => (
              <Image
                key={icon.alt}
                src={icon.src}
                alt={icon.alt}
                width={52}
                height={52}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
