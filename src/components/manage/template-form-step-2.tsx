"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import QuestionBoard from "@/components/board/question-board";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import useTemplateFormStore from "@/store/template-form-store";

import {
  CreateTemplateValues,
  StepTwoData,
  stepTwoSchema,
} from "@/lib/schema/template-schema";

const TemplateFormStepTwo = () => {
  const { decrement, setStepTwoData, stepOneData, stepTwoData } =
    useTemplateFormStore();

  const form = useForm<CreateTemplateValues>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: stepTwoData || {},
  });

  const {
    handleSubmit,
    control,
    setValue,
    // setFocus,
    watch,
    trigger,
    formState: { isSubmitting },
  } = form;

  const handlePrev = () => {
    decrement();
  };

  const submit = (data: StepTwoData) => {};

  return (
    <Form {...form}>
      <form noValidate onSubmit={handleSubmit(submit)}>
        <FormField
          control={control}
          name="questions"
          render={() => (
            <FormItem>
              <FormLabel>질문 선택</FormLabel>
              <FormControl>
                <QuestionBoard onQuestionSelected={setValue} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-[10px] pt-[43px]">
          <Button
            type="button"
            variant="gray"
            className="h-[56px] w-[103px] rounded-[16px] font-semibold"
            onClick={handlePrev}
          >
            이전
          </Button>
          <Button
            type="submit"
            className="btn-class1 h-[56px] w-[103px] rounded-[16px] font-semibold "
          >
            생성
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TemplateFormStepTwo;
