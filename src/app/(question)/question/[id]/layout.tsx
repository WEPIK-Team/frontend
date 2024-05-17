export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 임시로 설정한 레이아웃
  return (
    <main className="mx-auto flex h-[100dvh] w-[100dvw] max-w-[1080px] overflow-y-auto">
      {children}
    </main>
  );
}
