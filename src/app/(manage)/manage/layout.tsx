import Header from "@/components/common/header";
import ManageSidebar from "@/components/manage/manage-sidebar";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ManageSidebar />
      <div className="m-auto max-w-5xl pt-[44px]">{children}</div>
    </>
  );
}
