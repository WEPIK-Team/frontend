import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <div className="m-0 flex h-full flex-col">
        <Header showHelpButton />
        <main className="m-auto my-11 w-full max-w-3xl flex-grow px-4">
          {props.children}
        </main>
        <Footer />
      </div>
    </>
  );
}
