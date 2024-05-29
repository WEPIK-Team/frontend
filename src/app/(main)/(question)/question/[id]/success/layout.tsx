import { CaretLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/common/footer";

export default function QuestionSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-11 w-full items-center border-b bg-white">
        <div className="m-auto flex w-full max-w-3xl">
          <div className="flex justify-start">
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
      <main className="m-auto my-11 w-full max-w-3xl flex-1 px-4 pt-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
