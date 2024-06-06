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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_QUESTION}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionFormData),
    }
  );

  revalidateTag("manage-question");
  return response.json();
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

export const updateQuestion = async ({
  id,
  questionFormData,
}: {
  id: string;
  questionFormData: QuestionFormSchemaType;
}): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_QUESTION}/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionFormData),
    }
  ).catch((error) => {
    console.log("질문 수정에러");
    throw new Error(error.message);
  });

  revalidateTag("manage-question");

  return response.text();
};

export const getQuestionbyId = async (id: string): Promise<IQuestion> => {
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
