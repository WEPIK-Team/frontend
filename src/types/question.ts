export interface ISelectQuestion {
  id: number;
  title: string;
}

export type QuestionType =
  | "INPUT"
  | "SELECT"
  | "TEXTAREA"
  | "BAR"
  | "STAR_RANK"
  | "DATE";

export interface IQuestion {
  id: number;
  title: string;
  type: QuestionType;
  imageURL: string | null;
  content?: string;
  selectQuestions: ISelectQuestion[];
}

export interface IQuestionRequest extends IQuestion {
  content: string;
}

export interface IFileResponse {
  id: number;
  originalName: string;
  storedName: string;
  path: string;
  type: string;
  size: number;
}

export interface IAnswerQuestionParam {
  questions: IQuestionRequest[];
  templateId: string;
  senderId?: string;
}

interface IAnswerDtos {
  content: string;
  type: string;
  questionId: number;
  sequence: number;
}
export interface IAnswerQuestionRequest {
  templateId: number;
  answerDtos: IAnswerDtos[];
}

export interface IAnswerQuestionResponse {
  senderId: string;
  receiverId: string;
}

export type SelectQuestionDto = {
  sequence: number;
  title: string;
};

export type QuestionAnswer = {
  sequence: number;
  title: string;
  type: string;
  answer: string;
  imgPath: string;
  selectQuestionDtos: SelectQuestionDto[];
};

export interface IResultQuestion {
  templateTitle: string;
  senderAnswers: QuestionAnswer[];
  receiverAnswers: QuestionAnswer[];
}

export enum ColumnType {
  Use = "use",
  Unused = "unused",
}
