"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTemplateValues,
  createTemplateSchema,
} from "@/lib/schema/template-schema";
import { Input } from "@/components/ui/input";
import QuestionBoard from "@/components/board/question-board";
import { Button } from "@/components/ui/button";
import TagList from "@/components/tag/tag-list";

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
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
          템플릿 생성
        </h1>
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
                    <Input placeholder="" {...field} />
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
                    <TagList />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default CreateTemplateForm;
