"use server";

import { revalidateTag } from "next/cache";

import { QuestionFormSchemaType } from "@/lib/schema/manage-question-schema";

import { IFileResponse, IQuestion } from "@/types/question";

export const getManageQuestionList = async (): Promise<IQuestion[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_QUESTION}`,
    {
      next: {
        tags: ["manage-question"],
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => new Error(error.message));

  return response;
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
  )
    .then((res) => res.json())
    .catch((error) => new Error(error.message));

  return response;
};

export const createQuestion = async (
  questionFormData: QuestionFormSchemaType
): Promise<IQuestion> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_QUESTION}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionFormData),
    }
  )
    .then((res) => res.json())
    .catch((error) => new Error(error.message));

  revalidateTag("manage-question");
  return response;
};

export const deleteQuestion = async (id: string) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_QUESTION}/${id}`,
    {
      method: "DELETE",
    }
  );

  revalidateTag("manage-question");
};

export const getQuestionbyId = async (id: string): Promise<IQuestion> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_QUESTION}/${id}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error.message);
    });

  return response;
};
