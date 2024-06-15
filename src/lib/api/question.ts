"use server";

import {
  IAnswerQuestionRequest,
  IAnswerQuestionResponse,
  IResultQuestion,
} from "@/types/question";

export const completeQuestionAnswer = async (
  requestData: IAnswerQuestionRequest
): Promise<IAnswerQuestionResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ANSWER}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
      cache: "no-store",
    }
  ).catch((error) => {
    throw new Error(error.message);
  });

  return response.json();
};

export const getQuestionResult = async ({
  senderId,
  receiverId,
}: Record<string, string>): Promise<IResultQuestion> => {
  const queryString = `?senderId=${encodeURIComponent(senderId)}&receiverId=${encodeURIComponent(receiverId)}`;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_RESULT}${queryString}`,
    { cache: "no-store" }
  );

  return response.json();
};
