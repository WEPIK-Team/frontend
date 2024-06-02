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
  type: QuestionType;
  imageURL: string | null;
  content: string;
  selectQuestions: ISelectQuestion[];
}

export interface ITemplate {
  id: number;
  title: string;
  useCount: number;
  imageURL: string;
  templateTags: string[];
  questions: IQuestion[];
}
