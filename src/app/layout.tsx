import type { Metadata } from "next";

import "@/styles/globals.css";
import { allRoundGothic, pretendard } from "@/styles/font";

import { getMetadata } from "@/components/common/seo";
import KakaoScript from "@/components/share/kakao-script";
import { Toaster } from "@/components/ui/toaster";

import ReactQueryProvider from "@/provider/query-provider";

export const metadata: Metadata = getMetadata();

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
      <meta
        name="naver-site-verification"
        content="b6fe706535961ac3e136fea215622f264cce6a98"
      />
      <body className={`${pretendard.className} `}>
        <Toaster />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
      <KakaoScript />
    </html>
  );
}
