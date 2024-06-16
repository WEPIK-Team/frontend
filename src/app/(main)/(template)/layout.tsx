import Layout from "@/components/common/layout";
import HelpModal from "@/components/modal/help-modal";

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>{children}</Layout>
      <HelpModal />
    </>
  );
}
