import Layout from "@/components/common/layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
