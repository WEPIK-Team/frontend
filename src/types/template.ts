export interface Template {
  id: number;
  title: string;
  useCount: number;
  imageURL: string;
  templateTags: string[];
  isAdmin?: boolean;
}

export type TemplateList = Template[];
