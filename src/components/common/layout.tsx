import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <div className="m-0 flex h-full flex-col">
        <Header />
        <main className="container w-full max-w-3xl flex-grow px-0">
          {props.children}
        </main>
        <Footer />
      </div>
    </>
  );
}
