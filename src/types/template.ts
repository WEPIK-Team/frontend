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
