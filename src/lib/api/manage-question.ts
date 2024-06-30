"use server";

import { getCookie } from "cookies-next";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { QuestionFormSchemaType } from "@/lib/schema/manage-question-schema";

import { IFileResponse, IQuestion } from "@/types/question";

export const getManageQuestionList = async (): Promise<IQuestion[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_QUESTION}`,
    {
      cache: "no-store",
      next: {
        tags: ["manage-question"],
      },
    }
  );

  return response.json();
};

export const questionUploadImageFile = async (
  imageFileData: FormData
): Promise<IFileResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_IMAGE_UPLOAD}`,
    {
      method: "POST",
      body: imageFileData,
    }
  );

  return response.json();
};

export const createQuestion = async (
  questionFormData: QuestionFormSchemaType
): Promise<IQuestion> => {
  const JSESSIONID = getCookie("JSESSIONID", { cookies });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_QUESTION}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `JSESSIONID=${JSESSIONID}`,
      },
      body: JSON.stringify(questionFormData),
    }
  );

  revalidateTag("manage-question");
  return response.json();
};

export const deleteQuestion = async (id: number) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_QUESTION}/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  revalidateTag("manage-question");
};

export const updateQuestion = async ({
  id,
  questionFormData,
}: {
  id: number;
  questionFormData: QuestionFormSchemaType;
}): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_QUESTION}/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(questionFormData),
    }
  ).catch((error) => {
    throw new Error(error.message);
  });

  revalidateTag("manage-question");

  return response.text();
};

export const getQuestionbyId = async (id: number): Promise<IQuestion> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_QUESTION}/${id}`,
    {
      method: "GET",
    }
  ).catch((error) => {
    throw new Error(error.message);
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Request failed with status ${response.status}: ${errorText}`
    );
  }

  return response.json();
};
