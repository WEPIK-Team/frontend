"use server";

import { IFileResponse } from "@/types/question";

export const TemplatenUploadImageFile = async (
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
