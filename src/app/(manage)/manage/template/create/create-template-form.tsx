"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import QuestionBoard from "@/components/board/question-board";
import Heading from "@/components/common/heading";
import TagList from "@/components/tag/tag-list";
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
  createTemplateSchema,
  CreateTemplateValues,
} from "@/lib/schema/template-schema";

const CreateTemplateForm = () => {
  const form = useForm<CreateTemplateValues>({
    resolver: zodResolver(createTemplateSchema),
    defaultValues: {
      title: "",
      thumbnail: undefined,
      questions: [],
      tags: [],
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    // setFocus,
    // watch,
    // trigger,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateTemplateValues) {
    console.log(values);
  }

  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className="space-y-5 text-center">
        <Heading as="h1" className="text-left text-wpt-2xl">
          템플릿 생성
        </Heading>
      </div>
      <div className="rounded-lg border p-4">
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
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
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>썸네일</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      disabled={false}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>태그 선택</FormLabel>
                  <FormControl>
                    <TagList onTagSelected={setValue} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end pt-10">
              <Button type="submit">생성</Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default CreateTemplateForm;
