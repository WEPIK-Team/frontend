import type { Metadata } from "next";

import "@/styles/globals.css";
import { allRoundGothic, pretendard } from "@/styles/font";

import { MetaData } from "@/constants/config";
import ReactQueryProvider from "@/provider/query-provider";

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
      <body className={`${pretendard.className}`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
