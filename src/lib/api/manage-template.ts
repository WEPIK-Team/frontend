import { CreateTemplateValues } from "@/lib/schema/template-schema";

export const createTemplate = async (data: CreateTemplateValues) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TEMPLATE}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};
