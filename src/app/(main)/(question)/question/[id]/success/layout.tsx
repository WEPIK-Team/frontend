"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Footer from "@/components/common/footer";
import { Button } from "@/components/ui/button";

export default function QuestionSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="fixed inset-x-0 top-0 z-50 flex h-11 w-full border-b bg-white">
        <div className="m-auto flex h-11 w-full max-w-3xl items-center justify-between px-4">
          <Button
            className="h-full bg-transparent p-0"
            onClick={() => router.back()}
          >
            <Image
              src="/svgs/chevron-left.svg"
              width={15}
              height={15}
              alt="back"
              style={{ width: 15, height: 15 }}
            />
          </Button>
          <Button
            className="h-full bg-transparent"
            onClick={() => router.push("/")}
          >
            <Image src="/svgs/logo.svg" width={86} height={26} alt="logo" />
          </Button>
          <div className="w-[32px]" />
        </div>
      </nav>
      <main className="m-auto my-11 w-full max-w-3xl flex-1 px-4 pt-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
