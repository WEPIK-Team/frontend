import { MetadataRoute } from "next";

import { TemplateList } from "@/types/template";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_HOST
    : process.env.NEXT_PUBLIC_HOST;

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

async function getTemplateList(): Promise<TemplateList> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TEMPLATE}`
  );
  return response.json();
}
