import Footer from "@/components/common/footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="m-auto my-11 w-full max-w-3xl px-4">
      {children}
      <Footer />
    </main>
  );
}
