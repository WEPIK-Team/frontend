export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="m-auto max-w-5xl bg-background">{children}</div>;
}
