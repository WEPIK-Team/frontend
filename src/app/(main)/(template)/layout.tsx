import Layout from "@/components/common/layout";

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
