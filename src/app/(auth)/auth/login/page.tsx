import Image from "next/image";

import Heading from "@/components/common/heading";

import { IconsInAuth } from "@/constants/data";

import LoginForm from "./loginForm";

const LoginPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center pt-[80px]">
      <Image src="/svgs/logo.svg" width={111} height={22} priority alt="logo" />
      <Heading className="w-[200px] pb-[60px] pt-[15px] text-center text-wpt-lg font-semibold">
        어쩌구저쩌구 해서 뭐시기저시기 하는 서비스
      </Heading>
      <LoginForm />

      <div className="flex flex-col justify-center pt-12">
        <p className="m-auto p-0 text-wpt-base-1 font-semibold">
          SNS 계정으로 로그인
        </p>
        <div className="flex gap-3 pb-[104px] pt-4">
          {IconsInAuth.map((icon) => (
            <Image
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={52}
              height={52}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
