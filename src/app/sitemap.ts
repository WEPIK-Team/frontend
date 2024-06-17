import { MetadataRoute } from "next";

import { getTemplateList } from "@/lib/api/template";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://www.wepik.kr/";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const defaultSitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const templetes = await getTemplateList().catch((error) => {
    throw new Error(error.message);
  });

  const templateSitemaps = templetes.map((templete) => {
    return {
      url: `${BASE_URL}question/${templete.id.toString()}`,
      lastModified: new Date(),
    };
  });

  return [...defaultSitemap, ...templateSitemaps];
}
