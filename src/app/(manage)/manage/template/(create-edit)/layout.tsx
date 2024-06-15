export default function ManageTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="m-auto max-w-3xl pt-[44px]">{children}</div>;
}
