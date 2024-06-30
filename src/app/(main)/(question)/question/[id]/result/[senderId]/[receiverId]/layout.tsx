"use client";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

type QuestionResultProps = {
  params: {
    senderId: string;
    receiverId: string;
  };
};

export default function QuestionResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header showBackButton />
      <main className="m-auto mt-11 w-full max-w-3xl flex-1">{children}</main>
      <Footer />
    </div>
  );
}
