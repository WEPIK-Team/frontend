/**
 * public으로 접근 가능한 route 배열
 * 인증이 필요하지 않음.
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * 관리자만 접근 가능한 route
 * 인증이 필요하며 role이 ADMIN 이어야 합니다.
 * @type {string}
 */
export const adminRoutes = "/manage";

/**
 * 인증에 사용되는 route 배열
 * 이러한 경로는 로그인한 사용자를 /settings로 리디렉션합니다
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/signup"];

/**
 * 로그인 후 redirect 경로
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/manage";
