import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "유효한 이메일 주소가 아닙니다." }),
  password: z.string().min(1, { message: "비밀번호를 입력해 주세요." }),
  saveId: z.boolean().optional(),
});

export type loginValues = z.infer<typeof loginSchema>;
