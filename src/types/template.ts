import { IQuestionRequest } from "@/types/question";

export interface Template {
  id: number;
  title: string;
  useCount: number;
  imageURL: string;
  templateTags: string[];
}

export interface TemplateSelectCardProps extends Template {
  isAdmin?: boolean;
  selectedTags?: string[];
}

export type TemplateList = Template[];

export interface ITemplateDetail {
  id: number;
  title: string;
  useCount: number;
  imageURL: string;
  templateTags: string[];
  questions: IQuestionRequest[];
}
