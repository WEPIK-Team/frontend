"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import QuestionBoard from "@/components/board/question-board";
import TagBoard from "@/components/tag/tag-board";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  createTemplate,
  editTemplate,
  templatenUploadImageFile,
} from "@/app/(manage)/manage/template/actions";
import useTemplate from "@/hooks/use-template";
import {
  createTemplateSchema,
  CreateTemplateValues,
  templateInfoSchema,
} from "@/lib/schema/template-schema";

import { toast } from "../ui/use-toast";

const steps = [
  {
    id: "Step 1",
    name: "템플릿 정보",
    schema: templateInfoSchema,
    fields: ["title", "storedName", "tags"],
  },
  {
    id: "Step 2",
    name: "템플릿 질문 선택",
    schema: createTemplateSchema,
    fields: ["questionIds"],
  },
];

interface TemplateFormProps {
  mode: "edit" | "create";
}

const TemplateForm = ({ mode }: TemplateFormProps) => {
  const {
    currentStep,
    decrement,
    increment,
    templateInfo,
    setTemplateInfo,
    resetAllStates,
    questionIds,
  } = useTemplate();

  const [preview, setPreview] = useState<string | undefined>(undefined);
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<CreateTemplateValues>({
    resolver: zodResolver(steps[currentStep].schema),
    defaultValues: {
      title: templateInfo.title || "",
      storedName: templateInfo.storedName || "",
      tags: templateInfo.tags || [],
      questionIds: questionIds || [],
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    reset,
    formState: { isSubmitting },
  } = form;

  type FieldName = keyof CreateTemplateValues;

  const onNext = async (data: CreateTemplateValues) => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep === 0) {
      setTemplateInfo({
        title: data.title,
        storedName: data.storedName,
        tags: data.tags,
      });
    }

    const lastStep = steps.length - 1;

    if (currentStep < lastStep) {
      increment();
    }

    if (currentStep === lastStep) {
      let newFormData = { ...data };
      const { storedName, ...restData } = data;
      if (storedName && typeof storedName !== "string") {
        const formData = new FormData();

        formData.append("image", storedName);
        const uploadFilePath = await templatenUploadImageFile(formData);

        newFormData = { ...restData, storedName: uploadFilePath.storedName };

        if (!uploadFilePath)
          throw new Error(
            "이미지를 업로드 하는 도중 오류가 발생하였습니다! 다시 한번 시도해 주세요"
          );
      }

      // TODO: 성공 실패 메세지 출력
      if (mode === "create") {
        await createTemplate(newFormData);
      }

      if (mode === "edit") {
        const segments = pathname.split("/").filter((s) => s !== "");
        const templateId = segments[segments.length - 1].trim();
        if (!templateId) {
          return toast({
            variant: "destructive",
            className: cn(
              "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
            ),
            title: "템플릿 id가 존재하지 않습니다.",
          });
        }

        await editTemplate(templateId, newFormData);
      }
      reset();
      resetAllStates();
    }
  };

  const onPrev = () => {
    if (currentStep === 0) {
      router.push("/manage/template");
    }
    if (currentStep > 0) {
      decrement();
    }
  };

  useEffect(() => {
    if (form.watch("storedName")) {
      const file = form.watch("storedName");
      if (file && typeof file !== "string") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(undefined);
      }
    }
  }, [form.watch("storedName")]);

  const prevButtonLabel = currentStep === 0 ? "취소" : "이전";
  const nextButtonLabel = currentStep === steps.length - 1 ? "제출" : "다음";

  return (
    <Form {...form}>
      <form noValidate onSubmit={handleSubmit(onNext)}>
        {currentStep === 0 && (
          <div className="space-y-4">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      disabled={false}
                      className="p-[16px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="storedName"
              render={({ field }) => (
                <div className="flex space-x-[28px]">
                  <FormItem>
                    <FormLabel>썸네일</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="file"
                        accept="image/*"
                        disabled={false}
                        onChange={(e) =>
                          field.onChange(
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                        value={undefined}
                        className="block w-full text-wpt-base-1 text-wpc-gray
                  file:me-4 
                  file:rounded-lg file:border file:border-wpc-primary
                  file:px-4 file:py-2 file:text-[15px] 
                  file:text-wpc-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <div className="h-[200px] w-[264px] rounded-[18px] bg-wpc-gray2">
                    {(preview || templateInfo.storedName) && (
                      <Image
                        src={
                          preview ||
                          (typeof templateInfo.storedName === "string"
                            ? templateInfo.storedName
                            : "")
                        }
                        width={200}
                        height={265}
                        alt="Template Thumbnail Preview"
                      />
                    )}
                  </div>
                </div>
              )}
            />
            <FormField
              control={control}
              name="tags"
              render={() => (
                <FormItem className="pb-[80px]">
                  <FormLabel>태그 선택</FormLabel>
                  <FormControl>
                    <TagBoard
                      onTagSelected={setValue}
                      storeTags={templateInfo.tags}
                    />
                  </FormControl>
                  <FormMessage isAbsolute />
                </FormItem>
              )}
            />
          </div>
        )}
        {currentStep === 1 && (
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
        )}

        <div className="flex items-end justify-end gap-[10px]">
          <Button
            type="button"
            variant="gray"
            className="h-[56px] w-[103px] rounded-[16px] font-semibold"
            onClick={onPrev}
          >
            {prevButtonLabel}
          </Button>
          <Button
            type="submit"
            className="btn-class1 h-[56px] w-[103px] rounded-[16px] font-semibold "
            disabled={isSubmitting}
          >
            {nextButtonLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TemplateForm;
