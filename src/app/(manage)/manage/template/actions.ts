"use server";

import { revalidateTag } from "next/cache";

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

export const deleteTemplate = async (id: number) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TEMPLATE}/${id}`,
    {
      method: "DELETE",
    }
  );

  revalidateTag("template-list");
};
