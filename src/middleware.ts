import { NextRequest } from "next/server";
import { getServerSession } from "./app/layout";
import { adminRoutes, authRoutes } from "../routes";

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const jsessionid = cookies.get("JSESSIONID")?.value;
  const session = await getServerSession();

  const isLoggedIn = jsessionid && session;
  const isAdmin = jsessionid && session?.user?.role === "ADMIN";

  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAdminRoute) {
    if (isAdmin) return null;
    return Response.redirect(new URL("/", nextUrl));
  }

  if (isAuthRoute) {
    if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
    return null;
  }
  return null;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
