"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { CreateTemplateValues } from "@/lib/schema/template-schema";

import { IFileResponse } from "@/types/question";

export const templatenUploadImageFile = async (
  formData: FormData
): Promise<IFileResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_IMAGE_UPLOAD}`,
    {
      method: "POST",
      body: formData,
    }
  );

  return await response.json();
};

export const createTemplate = async (data: CreateTemplateValues) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TEMPLATE}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  revalidateTag("template-list");
  redirect("/manage/template");
};

export const editTemplate = async (id: string, data: CreateTemplateValues) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TEMPLATE}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  revalidateTag("template-list");
  redirect("/manage/template");
};

export const deleteTemplate = async (id: number) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TEMPLATE}/${id}`,
    {
      method: "DELETE",
    }
  );

  revalidateTag("template-list");
};
