"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { fetchSession } from "@/lib/api/auth";
import { AuthClientConfig, Session } from "@/types/auth";

export const __AUTH: AuthClientConfig = {
  basePath: process.env.NEXT_PUBLIC_LOCAL_HOST as string,
};

export interface UseSessionOptions<R extends boolean> {
  required: R;
}
export interface SessionProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

export type SessionContextValue<R extends boolean = false> = R extends true
  ?
      | { data: Session; status: "authenticated" }
      | { data: null; status: "loading" }
  :
      | { data: Session; status: "authenticated" }
      | {
          data: null;
          status: "unauthenticated" | "loading";
        };

export const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export function now() {
  return Math.floor(Date.now() / 1000);
}

export async function getSession() {
  const session = await fetchSession({});
  return session;
}

export function useSession<R extends boolean>(
  options?: UseSessionOptions<R>
): SessionContextValue<R> {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }

  // @ts-expect-error Satisfy TS if branch on line below
  const value: SessionContextValue<R> = useContext(SessionContext);
  if (!value && process.env.NODE_ENV !== "production") {
    throw new Error(
      "[auth]: `useSession`은 <SessionProvider />로 감싸야 합니다."
    );
  }

  const { required } = options ?? {};

  const requiredAndNotLoading = required && value.status === "unauthenticated";

  useEffect(() => {
    if (requiredAndNotLoading) {
      const url = `${__AUTH.basePath}/auth/login`;
      window.location.href = url;
    }
  }, [requiredAndNotLoading]);

  if (requiredAndNotLoading) {
    return {
      data: value.data,
      status: "loading",
    };
  }

  return value;
}

export function SessionProvider(props: SessionProviderProps) {
  if (!SessionContext) {
    throw new Error("React Context는 Server Component에서 사용할 수 없습니다.");
  }

  const { children } = props;

  const hasInitialSession = props.session !== undefined;

  const [session, setSession] = useState(() => {
    if (hasInitialSession) return props.session;
  });

  const [loading, setLoading] = useState(!hasInitialSession);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        if (session === null) {
          const newSession = await getSession();
          setSession(newSession);
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error in getSession:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const value: any = {
    data: session,
    status: loading ? "loading" : session ? "authenticated" : "unauthenticated",
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
