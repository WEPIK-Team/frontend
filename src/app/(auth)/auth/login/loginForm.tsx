"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginSchema, loginValues } from "@/lib/schema/auth-schema";

const LoginForm = () => {
  const form = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  async function onSubmit(values: loginValues) {
    // console.log(values);
  }

  const getCombinedErrorMessage = () => {
    const emailError = errors.email?.message;
    const passwordError = errors.password?.message;

    if (emailError) {
      return emailError;
    }
    if (passwordError) {
      return passwordError;
    }
    return null;
  };

  return (
    <Form {...form}>
      <form className="w-full" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={false}
                  placeholder="example@example.com"
                  isError={!!errors.email}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem className="pt-[8px]">
              <FormControl>
                <Input
                  disabled={false}
                  placeholder="******"
                  isError={!errors.email && !!errors.password}
                  {...field}
                />
              </FormControl>
              <FormMessage isAbsolute>{getCombinedErrorMessage()}</FormMessage>
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-between pb-[32px] pt-[28px]">
          <div className="flex items-center">
            <Image
              src="/svgs/check-active.svg"
              width={24}
              height={24}
              alt="index-isAnswer"
            />
            <span className="ml-2">아이디 저장</span>
          </div>
          <Link href="#" className="text-wpt-base-1 text-wpc-gray">
            비밀번호 찾기
          </Link>
        </div>
        <Button type="submit" block>
          로그인
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
