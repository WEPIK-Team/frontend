"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import TagBoard from "@/components/tag/tag-board";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import useTemplateFormStore from "@/store/template-form-store";

import { StepOneData, stepOneSchema } from "@/lib/schema/template-schema";

const TemplateFormStepOne = () => {
  const { increment, setStepOneData, stepOneData } = useTemplateFormStore();

  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      title: stepOneData.title || "",
      thumbnail: stepOneData.thumbnail || undefined,
      tags: stepOneData.tags || [],
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = form;

  const handleNext = (data: StepOneData) => {
    setStepOneData(data);
    increment();
  };

  useEffect(() => {
    if (form.watch("thumbnail")) {
      const file = form.watch("thumbnail");
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  }, [form.watch("thumbnail")]);

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        noValidate
        onSubmit={handleSubmit(handleNext)}
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} disabled={false} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="thumbnail"
          render={({ field: { value, onChange, ...fieldValues } }) => (
            <div className="flex space-x-[28px]">
              <FormItem>
                <FormLabel>썸네일</FormLabel>
                <FormControl>
                  <Input
                    {...fieldValues}
                    type="file"
                    accept="image/*"
                    disabled={false}
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>
                <FormMessage isAbsolute />
              </FormItem>
              <div className="h-[200px] w-[264px] rounded-[18px] bg-wpc-gray2">
                {preview && (
                  <Image
                    src={preview}
                    width={200}
                    height={265}
                    alt="Thumbnail Preview"
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
            <FormItem>
              <FormLabel>태그 선택</FormLabel>
              <FormControl>
                <TagBoard
                  onTagSelected={setValue}
                  storeTags={stepOneData.tags}
                />
              </FormControl>
              <FormMessage isAbsolute />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-[10px] pt-[80px]">
          <DialogClose asChild>
            <Button
              variant="gray"
              className="h-[56px] w-[103px] rounded-[16px] font-semibold"
            >
              취소
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="btn-class1 h-[56px] w-[103px] rounded-[16px] font-semibold "
          >
            다음
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TemplateFormStepOne;
