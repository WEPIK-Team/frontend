"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createTemplate } from "@/lib/api/manage-template";

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

import { templatenUploadImageFile } from "@/app/(manage)/manage/template/actions";
import { StepTwoData, stepTwoSchema } from "@/lib/schema/template-schema";

const TemplateFormStepTwo = () => {
  const { decrement, setStepTwoData, stepOneData, stepTwoData } =
    useTemplateFormStore();

  const form = useForm<StepTwoData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      questionIds: stepTwoData.questionIds,
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = form;

  const handlePrev = () => {
    decrement();
  };

  const submit = async (data: StepTwoData) => {
    if (!stepOneData.thumbnail) return;
    setStepTwoData(data);
    const formData = new FormData();
    formData.append("image", stepOneData?.thumbnail);

    const uploadFilePath = await templatenUploadImageFile(formData);

    const combinedData = {
      ...stepOneData,
      ...data,
      storedName: uploadFilePath.storedName,
    };

    await createTemplate(combinedData);
  };

  return (
    <Form {...form}>
      <form noValidate onSubmit={handleSubmit(submit)}>
        <FormField
          control={control}
          name="questionIds"
          render={() => (
            <FormItem className="pb-[20px]">
              <FormLabel>질문 선택</FormLabel>
              <FormControl>
                <QuestionBoard onQuestionSelected={setValue} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-[10px]">
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
