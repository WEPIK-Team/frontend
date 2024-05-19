import { z } from "zod";

const requiredString = z.string().min(1, "필수 입력");

const questionsSchema = z
  .array(z.string())
  .min(5, "적어도 5개 이상 질문이 필요합니다.");

const tagsSchema = z
  .array(z.string().min(1, "태그를 선택해주세요."))
  .min(2, "적어도 2개 이상 태그가 필요합니다.");

const templateThumbnailSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "이미지 파일이어야 합니다."
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "파일 크기는 2MB 이하여야 합니다.");

export const createTemplateSchema = z.object({
  title: requiredString.max(15),
  thumbnail: templateThumbnailSchema,
  questions: questionsSchema,
  tags: tagsSchema,
});

export type CreateTemplateValues = z.infer<typeof createTemplateSchema>;
