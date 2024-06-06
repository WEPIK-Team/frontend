import { ITemplateDetail, TemplateList } from "@/types/template";

export const getTemplateList = async (): Promise<TemplateList> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TEMPLATE}`,
    { cache: "no-store" }
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
  id: string
): Promise<ITemplateDetail> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TEMPLATE}/${id}`
  );

  return response.json();
};
