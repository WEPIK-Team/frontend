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
