import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav className="fixed z-50 flex h-[44px] w-full items-center border-b bg-white">
        <div className="flex w-full items-center justify-center">
          <Link href="/">
            <Image
              src="/images/logo.svg"
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
