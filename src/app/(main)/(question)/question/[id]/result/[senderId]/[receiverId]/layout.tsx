"use client";

import { CaretLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Footer from "@/components/common/footer";

export default function QuestionResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-11 w-full items-center border-b bg-white">
        <div className="m-auto flex w-full max-w-3xl">
          <div className="flex justify-start" onClick={() => router.back()}>
            <CaretLeftIcon className="h-8 w-8" />
          </div>
          <div className="flex w-full items-center justify-center">
            <Link href="/">
              <Image
                src="/svgs/logo.svg"
                width={86}
                height={26}
                priority
                alt="logo"
              />
            </Link>
          </div>
        </div>
      </nav>
      <main className="m-auto mt-11 w-full max-w-3xl flex-1">{children}</main>
      <Footer />
    </div>
  );
}
