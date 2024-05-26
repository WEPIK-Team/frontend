import {
  ChevronDownIcon,
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
import { QuestionSelectOptions } from "@/lib/data/select";
import { cn } from "@/lib/utils";

interface IQuestionFormProps {}

const QuestionForm: React.FunctionComponent<IQuestionFormProps> = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const [isOpen, setIsOpen] = React.useState(false);

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
      <div className="space-y-[10px]">
        <Label htmlFor="title" className="text-[20px] text-wpc-primary">
          제목
        </Label>
        <Input
          disabled={false}
          onChange={onFileChange}
          id="title"
          type="text"
        />
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <div className="space-y-[10px]">
          <Label htmlFor="thumbnail" className="text-[20px] text-wpc-primary">
            썸네일
          </Label>
          <Input
            disabled={false}
            onChange={onFileChange}
            id="thumbnail"
            type="file"
            className="block w-full text-wpt-base-1 text-wpc-gray
            file:me-4 
            file:rounded-lg file:border file:border-wpc-primary
            file:px-4 file:py-2 file:text-[15px] 
            file:text-wpc-primary"
          />
        </div>
        <div>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              width={100}
              height={200}
              className="aspect-video max-h-[200px] w-full rounded-md bg-cover"
            />
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-md bg-wpc-gray2" />
          )}
        </div>
      </div>
      <div className="space-y-[10px]">
        <Label htmlFor="type" className="text-[20px] text-wpc-primary">
          질문 타입
        </Label>
        <Select
          onOpenChange={(isOpen) => {
            setIsOpen(isOpen);
          }}
        >
          <SelectTrigger className="h-[60px] w-full rounded-[18px] px-[15px] py-[17px]">
            <div className="flex w-full items-center justify-between">
              <SelectValue placeholder="타입 선택" className="text-wpt-md" />
              <ChevronDownIcon
                width={25}
                height={20}
                className={cn(
                  "transition-transform",
                  isOpen ? "rotate-180" : ""
                )}
              />
            </div>
          </SelectTrigger>
          <SelectContent>
            {QuestionSelectOptions.map((el) => (
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
      </div>
    </form>
  );
};

export default QuestionForm;
