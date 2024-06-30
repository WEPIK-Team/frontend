"use client";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export default function QuestionSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header showBackButton />
      <main className="m-auto my-11 w-full max-w-3xl flex-1 px-4 pt-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
