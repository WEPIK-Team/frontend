import { z } from "zod";

const requiredString = z
  .string({
    required_error: "제목은 필수로 입력해야 합니다.",
  })
  .min(2, "제목은 최소 1자 이상이어야 합니다.");

const typeSchema = z
  .string({
    required_error: "질문 타입을 선택해 주세요",
  })
  .min(1, "질문 타입을 선택해 주세요");

const selectItemSchema = z.object({
  title: requiredString.max(30, "30자 이상은 입력하실 수 없습니다."),
});

const selectListSchema = z.array(selectItemSchema).optional();

const questionImageSchema = z.string().optional();

export const QuestionSchema = z
  .object({
    title: requiredString.max(20, "제목은 20자 이하로 작성해야 합니다."),
    type: typeSchema,
    storedName: questionImageSchema,
    selectQuestions: selectListSchema,
  })
  .refine(
    (data) => {
      if (
        data.type === "SELECT" &&
        (!data.selectQuestions || data.selectQuestions.length === 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "질문 타입이 SELECT인 경우, 적어도 하나의 선택 질문을 입력해야 합니다.",
      path: ["selectQuestions"],
    }
  );

export type QuestionFormSchemaType = z.infer<typeof QuestionSchema>;
