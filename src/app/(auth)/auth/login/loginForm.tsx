"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginSchema, loginValues } from "@/lib/schema/auth-schema";

import { login } from "../actions";

const STORAGE_KEY = "savedEmail";

const LoginForm = () => {
  const router = useRouter();

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
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  useEffect(() => {
    const savedEmail = getCookie(STORAGE_KEY);
    if (savedEmail) {
      setValue("email", savedEmail);
      setValue("saveId", true);
    }
  }, [setValue]);

  async function onSubmit(values: loginValues) {
    const res = await login(values);

    if (res.httpStatus === "UNAUTHORIZED") {
      setError("password", { message: res.message });
    } else {
      router.push("/");
    }

    if (values.saveId) {
      setCookie(STORAGE_KEY, values.email, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      });
    } else {
      deleteCookie(STORAGE_KEY);
    }
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
                  type="password"
                  isError={!errors.email && !!errors.password}
                  {...field}
                />
              </FormControl>
              <FormMessage isAbsolute>{getCombinedErrorMessage()}</FormMessage>
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-between pb-[32px] pt-[28px]">
          <FormField
            control={control}
            name="saveId"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center space-y-0">
                <FormControl>
                  <Checkbox
                    id="saveid"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <label htmlFor="saveid" className="ml-2 cursor-pointer">
                  아이디 저장
                </label>
              </FormItem>
            )}
          />

          {/* <Link href="#" className="text-wpt-base-1 text-wpc-gray">
            비밀번호 찾기
          </Link> */}
        </div>
        <Button type="submit" block disabled={isSubmitting}>
          로그인
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
