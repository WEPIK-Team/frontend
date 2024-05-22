import { faker } from "@faker-js/faker";

// TODO: 타입 분리 및 Type 이름 변경

export enum QuestionType {
  INPUT = "input",
  TEXTAREA = "textarea",
  STARS = "stars",
  BAR = "bar",
  SELECT = "select",
}

export enum ColumnType {
  Use = "use",
  Unused = "unused",
}

export interface BaseQuestion {
  id: string;
  title: string;
  type: QuestionType;
  column: ColumnType;
}

export function generateQuestion() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    type: faker.helpers.arrayElement(Object.values(QuestionType)),
    column: ColumnType.Unused,
  };
}

export function generateQuestions(count = 10) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion());
  }
  return questions;
}
