"use server";

import {
  IAnswerQuestionRequest,
  IAnswerQuestionResponse,
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
    }
  );

  return response.json();
};
