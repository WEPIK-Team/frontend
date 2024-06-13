import { z } from "zod";

const requiredString = z.string().min(1, "필수 입력");

const questionsSchema = z
  .array(z.number())
  .min(5, "적어도 5개 이상 질문이 필요합니다.");

const tagsSchema = z
  .array(z.string())
  .min(2, "적어도 2개 이상의 태그가 필요합니다.");

const templateThumbnailSchema = z
  .custom<File>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "이미지 파일이어야 합니다."
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "파일 크기는 2MB 이하여야 합니다.");

export const stepOneSchema = z.object({
  title: requiredString.max(15),
  thumbnail: templateThumbnailSchema.optional(),
  tags: tagsSchema,
});

export const stepTwoSchema = z.object({
  questionIds: questionsSchema,
});

export const createTemplateSchema = stepOneSchema.merge(stepTwoSchema);

export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
export type CreateTemplateValues = z.infer<typeof createTemplateSchema>;
