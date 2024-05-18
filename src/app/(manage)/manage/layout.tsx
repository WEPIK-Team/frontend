export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-background m-auto max-w-5xl">{children}</div>;
}
