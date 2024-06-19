import { format } from "date-fns";
import { ko } from "date-fns/locale";

import {
  IAnswerQuestionParam,
  IQuestion,
  IQuestionRequest,
} from "@/types/question";

export function initQuestions(questions: IQuestion[]): IQuestionRequest[] {
  return questions.map((question) => ({ ...question, content: "" }));
}

export function formatDateforKor(date: Date): null | string {
  if (!date) return null;
  return format(date, "yyyy/MM/dd", {
    locale: ko,
  });
}

export function formatDateforServer({ from, to }: { from: Date; to?: Date }) {
  const newValue = to
    ? `${formatDateforKor(from)} - ${formatDateforKor(to)}`
    : `${formatDateforKor(from)}`;

  return newValue;
}

export function generateQuestionRequestData({
  questions,
  templateId,
  senderId,
}: IAnswerQuestionParam) {
  const uuid = senderId ? senderId : null;

  const answerDtos = questions.map((question, i) => ({
    content: question.content.toString(),
    type: question.type,
    questionId: question.id,
    sequence: i + 1,
  }));

  if (!uuid)
    return {
      templateId: parseInt(templateId),
      answerDtos,
    };

  return {
    uuid,
    templateId: parseInt(templateId),
    answerDtos,
  };
}

export function allQuestionCheck(questions: IQuestionRequest[]): boolean {
  for (const el of questions) {
    if (!el.content) return false;
  }
  return true;
}

export function calRatingComment(rating: number): string {
  switch (true) {
    case rating >= 0 && rating <= 1:
      return "최악이에요";
    case rating === 1.5:
      return "정말 싫어요";
    case rating === 2:
      return "별로에요";
    case rating === 2.5:
      return "조금 아쉬워요";
    case rating === 3:
      return "그럭저럭이에요";
    case rating === 3.5:
      return "나름 괜찮아요";
    case rating === 4:
      return "만족스러워요";
    case rating === 4.5:
      return "훌륭해요";
    case rating === 5:
      return "최고예요";
    default:
      return "유효하지 않은 별점입니다";
  }
}
