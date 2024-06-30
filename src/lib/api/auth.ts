// import { redirect } from "next/dist/server/api-utils";

import { Session } from "@/types/auth";
import { deleteCookie, getCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

export const fetchSession = async (
  options?: OptionsType,
  server: boolean = false
): Promise<Session | null> => {
  try {
    const JSESSIONID = getCookie("JSESSIONID", options);

    if (!JSESSIONID) return null;

    const apiUrl = server
      ? `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_MEMBER_SESSION}`
      : `${process.env.NEXT_PUBLIC_MEMBER_SESSION}`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `JSESSIONID=${JSESSIONID}`,
      },
      credentials: "include",
    });

    if (res.status === 401 || !res.ok) {
      return null;
    }

    const data = await res.json();

    if (!data || Object.keys(data).length === 0) {
      return null;
    }

    const session: Session = {
      user: {
        email: data.email,
        nickname: data.nickname,
        role: data.role,
      },
    };

    return session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};

export async function logout() {
  const JSESSIONID = getCookie("JSESSIONID");

  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ADMIN_LOGOUT}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `JSESSIONID=${JSESSIONID}`,
      },
      credentials: "include",
    }
  );

  deleteCookie("JSESSIONID");
}
