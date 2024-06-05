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
  id: string;
  title: string;
  type: QuestionType | "";
  imageURL: string | null;
  selectQuestions: ISelectQuestion[];
}

export interface IQuestionRequest extends IQuestion {
  content: string;
}

export interface ITemplate {
  id: number;
  title: string;
  useCount: number;
  imageURL: string;
  templateTags: string[];
  questions: IQuestion[];
}

export interface IFileResponse {
  id: number;
  originalName: string;
  storedName: string;
  path: string;
  type: string;
  size: number;
}
