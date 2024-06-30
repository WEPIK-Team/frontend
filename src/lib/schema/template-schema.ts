import { z } from "zod";

const requiredString = z.string().min(1, "필수 입력");

const questionsSchema = z.array(z.number());

const requiredQuestionIdsSchema = questionsSchema.min(
  5,
  "적어도 5개 이상 질문이 필요합니다."
);

const tagsSchema = z
  .array(z.string())
  .min(2, "적어도 2개 이상의 태그가 필요합니다.");

const templateThumbnailSchema = z.union([
  requiredString,
  z
    .instanceof(File)
    .refine(
      (file) => file.type.startsWith("image/"),
      "이미지 파일이어야 합니다."
    )
    .refine(
      (file) => file.size < 1024 * 1024 * 2,
      "파일 크기는 2MB 이하여야 합니다."
    ),
]);

export const templateInfoSchema = z.object({
  title: requiredString.max(50),
  storedName: templateThumbnailSchema,
  tags: tagsSchema,
});

export const templateQuestionIdsSchema = z.object({
  questionIds: requiredQuestionIdsSchema,
});

export const createTemplateSchema = templateInfoSchema.merge(
  templateQuestionIdsSchema
);

export type TemplateInfo = z.infer<typeof templateInfoSchema>;
export type TemplateQuestionIds = z.infer<typeof templateQuestionIdsSchema>;
export type CreateTemplateValues = z.infer<typeof createTemplateSchema>;
