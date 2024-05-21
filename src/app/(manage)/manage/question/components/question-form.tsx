import {
  InputIcon,
  ListBulletIcon,
  SliderIcon,
  TextAlignLeftIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IQuestionFormProps {}

const QuestionForm: React.FunctionComponent<IQuestionFormProps> = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  return (
    <form className="grid w-full grid-cols-1 gap-4">
      <div>
        <Label htmlFor="title">제목</Label>
        <Input
          disabled={false}
          onChange={onFileChange}
          id="title"
          type="text"
        />
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <div>
          <Label htmlFor="thumbnail">썸네일</Label>
          <Input
            disabled={false}
            onChange={onFileChange}
            id="thumbnail"
            type="file"
          />
        </div>
        <div>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              width={100}
              height={100}
              className="aspect-video max-h-[100px] w-full rounded-md bg-contain"
            />
          ) : (
            <div className="flex h-[150px] items-center justify-center rounded-md bg-slate-400">
              Not Image
            </div>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="title">질문 타입</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="select">
              <div className="flex items-center gap-x-2">
                <ListBulletIcon />
                Select
              </div>
            </SelectItem>
            <SelectItem value="progress">
              <div className="flex items-center gap-x-2">
                <SliderIcon />
                Progress
              </div>
            </SelectItem>
            <SelectItem value="text">
              <div className="flex items-center gap-x-2">
                <InputIcon />
                text
              </div>
            </SelectItem>
            <SelectItem value="textArea">
              <div className="flex items-center gap-x-2">
                <TextAlignLeftIcon />
                textArea
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
};

export default QuestionForm;
