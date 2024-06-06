import type { Metadata } from "next";

import "@/styles/globals.css";
import { allRoundGothic, pretendard } from "@/styles/font";

import GlobalLoadingModal from "@/components/modal/global-loading-modal";
import { Toaster } from "@/components/ui/toaster";

import { MetaData } from "@/constants/config";
import ReactQueryProvider from "@/provider/query-provider";
import GlobalLoadingModal from "@/components/modal/global-loading-modal";

export const metadata: Metadata = MetaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${allRoundGothic.variable}`}
    >
      <body className={`${pretendard.className} `}>
        <Toaster />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <GlobalLoadingModal
          title="잠시만 기다려 주세요"
          description="데이터를 불러오는 중 입니다...."
        />
      </body>
    </html>
  );
}
