import type { Metadata } from "next";
import { cookies } from "next/headers";

import "@/styles/globals.css";
import { allRoundGothic, pretendard } from "@/styles/font";

import { getMetadata } from "@/components/common/seo";
import { fetchSession } from "@/lib/api/auth";

import KakaoScript from "@/components/share/kakao-script";
import { Toaster } from "@/components/ui/toaster";

import ReactQueryProvider from "@/provider/query-provider";
import { SessionProvider } from "@/provider/session-provider";
import { Session } from "@/types/auth";

export const metadata: Metadata = getMetadata();

export async function getServerSession(): Promise<Session | null> {
  const session = await fetchSession({ cookies }, true);
  return session;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

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
        <SessionProvider session={session}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SessionProvider>
      </body>
      <KakaoScript />
    </html>
  );
}
