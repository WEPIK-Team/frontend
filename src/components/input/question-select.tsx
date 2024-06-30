"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import useQuestion from "@/hooks/use-question";

import PrevNextBtns from "../question/prev-next-btns";
import QuestionFormWrapper from "../question/question-form-wrapper";
import SelectItem from "../question/select-item";

import { ISelectQuestion } from "@/types/question";

export interface SelectOption {
  label: string;
  value: string;
}

interface IQuestionSelectProps {}

// form validation
const FormSchema = z.object({
  SELECT: z
    .string({
      required_error: "질문을 선택해 주세요",
    })
    .min(1, "질문을 선택해 주세요"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const QuestionSelect: React.FunctionComponent<IQuestionSelectProps> = () => {
  const { currentQuestion } = useQuestion();
  const { content, selectQuestions, id } = currentQuestion;
  const [selectedValue, setSelectedValue] = useState(content);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    setSelectedValue(content);
    form.reset({ SELECT: content });
  }, [content, form, id]);

  const renderSelectItems = (
    field: ControllerRenderProps<
      {
        SELECT: string;
      },
      "SELECT"
    >
  ) => (
    <ul className="flex w-full flex-col space-y-2">
      {selectQuestions.map((el: ISelectQuestion, i: number) => (
        <motion.div
          key={el.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.3 }}
          style={{ listStyleType: "none" }}
        >
          <SelectItem
            value={el.title}
            theme="default"
            isSelect={i === parseInt(field.value)}
            onClick={() => {
              setSelectedValue(i + "");
              field.onChange(i + "");
            }}
          />
        </motion.div>
      ))}
    </ul>
  );

  return (
    <Form {...form}>
      <QuestionFormWrapper>
        <form
          className={cn(
            "flex w-full flex-col  space-y-2",
            currentQuestion.imageURL
              ? "flex-grow pb-8 pt-2"
              : "items-center justify-center"
          )}
        >
          <FormField
            control={form.control}
            name="SELECT"
            render={({ field }) => (
              <FormItem className="w-full">
                {renderSelectItems(field)}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        <PrevNextBtns<FormSchemaType>
          type="SELECT"
          form={form}
          disabled={!selectedValue}
        />
      </QuestionFormWrapper>
    </Form>
  );
};

export default QuestionSelect;
