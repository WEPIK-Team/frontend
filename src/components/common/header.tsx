import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-11 w-full items-center border-b bg-white">
        <div className="flex w-full items-center justify-center">
          <Link href="/">
            <Image
              src="/svgs/logo.svg"
              width={86}
              height={26}
              priority
              alt="logo"
            />
          </Link>
        </div>
      </nav>
    </>
  );
}
