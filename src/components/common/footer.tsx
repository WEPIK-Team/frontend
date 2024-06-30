import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="container h-[160px] w-full max-w-3xl bg-gradient-to-t from-[#FDFCFF] from-[0%] to-[#F8F7FD] to-[100%] py-4 text-wpt-sm font-medium text-wpc-gray">
        <section className="mb-[15px] flex justify-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={86}
              height={26}
              priority
              alt="DesktopLogo"
            />
          </Link>
        </section>
        <section className="mb-[10px] flex justify-center gap-3">
          <Link href="/">서비스 소개</Link>
          <Link href="/">이용약관</Link>
          <Link href="/" className="text-[#65656D]">
            개인정보 처리방침
          </Link>
        </section>
        <section className="mb-[10px] flex justify-center gap-3">
          <p className="font-normal text-[65656D]">문의 wepik@wepik.com</p>
        </section>
        <section className="mb-[2px] flex justify-center gap-3 text-xs font-light">
          <p>ⓒ 2024. WEPIK. All Rights Reserved.</p>
        </section>
        <section className="flex justify-center gap-3 text-xs font-light">
          <p>[FE] 비블, 조이, 라이언 | [BE] 망구스, 카이 | [DE] 조앤</p>
        </section>
      </footer>
    </>
  );
}
