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
  type: QuestionType | "";
  imageURL: string | null;
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
