"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="m-0 flex h-full flex-col">
      <Header />
      <main className="m-auto my-11 w-full max-w-3xl flex-grow px-4">
        <section className="flex h-full flex-col items-center justify-center">
          <Image src="/svgs/404.svg" alt="404-image" width={260} height={207} />
          <div className="my-[10px] text-center text-wpt-lg font-semibold">
            <h1 className="m-0 p-0">일시적인 오류로</h1>
            <h1 className="m-0 p-0">서비스 접속에 실패했습니다.</h1>
          </div>
          <p className="text-wpt-md font-normal text-wpc-gray">
            잠시 후에 다시 시도해 주세요.
          </p>
          <Button
            variant="default"
            className="mt-24 h-[60px] w-[368px]"
            onClick={() => router.push("/")}
          >
            홈으로 가기
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
