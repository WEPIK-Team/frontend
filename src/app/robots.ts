import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://www.wepik.kr/";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/manage/",
    },
    sitemap: `${BASE_URL}sitemap.xml`,
  };
}

/**
 #
 #      ##   ##  ######   #####     ####    ##  ##
 #      ##   ##  ##       ##  ##     ##     ## ##
 #      ##   ##  ##       ##  ##     ##     ####
 #      ## # ##  ####     #####      ##     ###
 #      #######  ##       ##         ##     ####
 #      ### ###  ##       ##         ##     ## ##
 #      ##   ##  ######   ##        ####    ##  ##
 #
 */
