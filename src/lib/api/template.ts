import { ITemplateDetail, TemplateList } from "@/types/template";

export const getTemplateList = async (): Promise<TemplateList> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TEMPLATE}`,
    {
      cache: "no-store",
      next: {
        tags: ["template-list"],
      },
    }
  );
  return response.json();
};

export const getTagList = async (): Promise<string[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TEMPLATE_TAG}`,
    { cache: "no-store" }
  );
  return response.json();
};

export const getTempleteDetail = async (
  id: number
): Promise<ITemplateDetail> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TEMPLATE}/${id}`,
    { cache: "no-store" }
  );

  return response.json();
};
