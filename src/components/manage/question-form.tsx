"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import * as React from "react";
import { useForm } from "react-hook-form";

import {
  createQuestion,
  questionUploadImageFile,
  updateQuestion,
} from "@/lib/api/manage-question";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

import { QuestionSelectFormOptions } from "@/lib/data/select";
import {
  QuestionFormSchemaType,
  QuestionSchema,
} from "@/lib/schema/manage-question-schema";

import QuestionAddSelect from "./question-add-select";

import { IQuestion, QuestionType } from "@/types/question";

interface IQuestionFormProps {
  buttonConfirmName: string;
  onClose: () => void;
  onConfirm?: () => void;
  questionData: Omit<IQuestion, "type"> & {
    type: "" | QuestionType;
  };
  mode: "create" | "edit";
}

interface IFileState {
  selectedFile: File | null;
  previewUrl: string | null;
  uploadedImageUrl: string | null;
  isLoading: boolean;
  selectIsOpen: boolean;
}

const QuestionForm: React.FunctionComponent<IQuestionFormProps> = ({
  buttonConfirmName,
  onClose,
  onConfirm,
  questionData,
  mode,
}) => {
  // form
  const form = useForm<QuestionFormSchemaType>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: questionData.title || undefined,
      type: questionData.type || undefined,
      storedName: questionData.imageURL || undefined,
      selectQuestions: questionData.selectQuestions,
    },
  });

  const typeValue = form.watch("type");

  // state
  const [fileState, setFileState] = React.useState<IFileState>({
    selectedFile: null,
    previewUrl: null,
    isLoading: false,
    selectIsOpen: false,
    uploadedImageUrl: questionData.imageURL,
  });

  const {
    selectedFile,
    selectIsOpen,
    isLoading,
    previewUrl,
    uploadedImageUrl,
  } = fileState;
  const fileRef = React.useRef<HTMLInputElement>(null);

  // function
  React.useEffect(() => {
    if (!fileState.selectedFile) {
      setFileState((prevState) => ({
        ...prevState,
        previewUrl: null,
      }));
      return;
    }
    const objectUrl = URL.createObjectURL(fileState.selectedFile);
    setFileState((prevState) => ({
      ...prevState,
      previewUrl: objectUrl,
    }));
    return () => URL.revokeObjectURL(objectUrl);
  }, [fileState.selectedFile]);

  React.useEffect(() => {
    form.setValue("storedName", questionData.imageURL || "");
  }, [form, questionData.imageURL]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      file instanceof File &&
      file.type.startsWith("image/") &&
      file.size < 1024 * 1024 * 2
    ) {
      setFileState((prevState) => ({
        ...prevState,
        selectedFile: file,
        uploadedImageUrl: null,
      }));
    } else {
      form.setError("storedName", {
        message: "파일 형식이 올바르지 않습니다 (2MB 이하의 이미지 파일)",
      });
    }
  };

  const handleImageReset = () => {
    setFileState((prevState) => ({
      ...prevState,
      selectedFile: null,
      uploadedImageUrl: null,
    }));
    form.setValue("storedName", "");

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleLoading = (value: boolean) => {
    setFileState((prevState) => ({
      ...prevState,
      isLoading: value,
    }));
  };

  const onSubmit = async (data: QuestionFormSchemaType) => {
    const newFormData = { ...data };

    handleLoading(true);
    try {
      // 이미지가 있을 경우
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const uploadFilePath = await questionUploadImageFile(formData);

        if (!uploadFilePath)
          throw new Error(
            "이미지를 업로드 하는 도중 오류가 발생하였습니다! 다시 한번 시도해 주세요"
          );

        newFormData.storedName = uploadFilePath.storedName;
      }

      let successData;
      if (mode === "create") {
        successData = await createQuestion(newFormData);
      } else if (mode === "edit") {
        successData = await updateQuestion({
          id: questionData.id,
          questionFormData: newFormData,
        });
      }

      if (successData) {
        toast({
          variant: "success",
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
          title: `질문 ${mode === "edit" ? "수정" : "작성"}에 성공하셨습니다!`,
        });
        onClose();
        handleLoading(false);
      }
    } catch (error) {
      handleLoading(false);
      throw new Error(
        "데이터를 업로드 하는데 오류가 발생하였습니다! 다시 한번 시도해 주세요"
      );
    } finally {
      handleLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-1 gap-4 "
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-[10px]">
              <FormLabel>제목</FormLabel>
              <Input
                onChange={field.onChange}
                id="title"
                type="text"
                value={field.value || ""}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="storedName"
          render={() => (
            <FormItem className="grid grid-cols-2 gap-x-2">
              <div className="space-y-[10px]">
                <FormLabel>썸네일</FormLabel>
                <Input
                  disabled={false}
                  ref={fileRef}
                  onChange={onFileChange}
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  className="block w-full text-wpt-base-1 text-wpc-gray
                            file:me-4 
                            file:rounded-lg file:border file:border-wpc-primary
                            file:px-4 file:py-2 file:text-[15px] 
                            file:text-wpc-primary"
                />
              </div>
              <div>
                {previewUrl ? (
                  <div className="relative">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={100}
                      height={200}
                      className="aspect-video max-h-[200px] w-full rounded-md bg-cover"
                    />
                    <Button
                      type="button"
                      disabled={isLoading}
                      onClick={handleImageReset}
                      className="absolute right-5 top-0 h-fit p-2"
                      variant="gray"
                    >
                      <Cross1Icon
                        width={15}
                        height={15}
                        className="text-destructive "
                      />
                    </Button>
                  </div>
                ) : uploadedImageUrl ? (
                  <div className="relative">
                    <Image
                      src={uploadedImageUrl}
                      alt="Preview"
                      width={100}
                      height={200}
                      className="aspect-video max-h-[200px] w-full rounded-md bg-cover"
                    />
                    <Button
                      type="button"
                      disabled={isLoading}
                      onClick={handleImageReset}
                      className="absolute right-5 top-0 h-fit p-2"
                      variant="gray"
                    >
                      <Cross1Icon
                        width={15}
                        height={15}
                        className="text-destructive "
                      />
                    </Button>
                  </div>
                ) : (
                  <div className="flex h-[200px] items-center justify-center rounded-md bg-wpc-gray2" />
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isLoading}
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-[10px]">
              <FormLabel>질문 타입</FormLabel>
              <Select
                value={field.value}
                onOpenChange={(isOpen) => {
                  setFileState({ ...fileState, selectIsOpen: isOpen });
                }}
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("selectQuestions", []);
                }}
              >
                <SelectTrigger className="h-[60px] w-full rounded-[18px] px-[15px] py-[17px]">
                  <div className="flex w-full items-center justify-between">
                    <SelectValue
                      placeholder="타입 선택"
                      className="text-wpt-md"
                    />
                    <ChevronDownIcon
                      width={25}
                      height={20}
                      className={cn(
                        "transition-transform",
                        selectIsOpen ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {QuestionSelectFormOptions.map((el) => (
                    <SelectItem
                      value={el.value}
                      key={new Date() + el.value}
                      className="w-full text-wpc-gray "
                    >
                      <div className="flex w-full items-center gap-x-2 ">
                        {el.icon} {el.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {typeValue === "SELECT" && (
          <FormField
            disabled={isLoading}
            control={form.control}
            name="selectQuestions"
            render={({ field }) => {
              return (
                <FormItem>
                  <QuestionAddSelect
                    selectList={field.value}
                    setSelectList={(newSelectList) =>
                      form.setValue("selectQuestions", newSelectList)
                    }
                  />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}

        <div className="mt-10 flex items-center justify-end space-x-2 overflow-y-auto">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="h-fit rounded-[16px] bg-wpc-light-gray px-[30px] py-[13px] text-wpc-gray disabled:cursor-not-allowed disabled:opacity-70"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isLoading}
            onClick={onConfirm}
            className="h-fit rounded-[16px] bg-wpc-primary px-[30px] py-[13px] text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {buttonConfirmName}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
