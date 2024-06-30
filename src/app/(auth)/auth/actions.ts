"use server";

import { setCookie } from "cookies-next";
import { cookies } from "next/headers";

import { loginSchema, loginValues } from "@/lib/schema/auth-schema";

export async function login(values: loginValues) {
  const validation = loginSchema.safeParse({
    email: values.email,
    password: values.password,
  });

  if (validation.success) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ADMIN_LOGIN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      }
    );
    if (res.ok) {
      const setCookieHeader = res.headers.get("set-cookie");
      if (setCookieHeader) {
        const jsessionidMatch = setCookieHeader.match(/JSESSIONID=([^;]+)/);

        if (jsessionidMatch) {
          const jsessionid = jsessionidMatch[1];

          setCookie("JSESSIONID", jsessionid, {
            cookies,
          });
        } else {
          console.log("JSESSIONID not found in the Set-Cookie header.");
        }
      } else {
        console.log("Set-Cookie header not found.");
      }
    }

    return res.json();
  } else {
    return {
      errors: validation.error.issues,
    };
  }
}
