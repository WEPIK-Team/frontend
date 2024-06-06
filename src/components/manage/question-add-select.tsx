import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IQuestionAddSelectProps {
  selectList?: { title: string }[];
  setSelectList: (newSelectList: { title: string }[]) => void;
}

const QuestionAddSelect: React.FunctionComponent<IQuestionAddSelectProps> = ({
  selectList,
  setSelectList,
}) => {
  const [title, setTitle] = React.useState("");

  const handleAdd = (value: string) => {
    if (!value || !selectList) return;
    if (selectList.some((item) => item.title === value)) return; // Prevent duplicate titles

    const selectItem = { title: value };
    setSelectList([...selectList, selectItem]);
    setTitle(""); // Reset input field after adding
  };

  const handleDelete = (idx: number) => {
    const updatedList = selectList?.filter((_, index) => index !== idx) || [];
    setSelectList(updatedList);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    if (event.key === "Enter" && title !== "") {
      handleAdd(title);
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <ul className="space-y-2 p-1">
        {selectList?.map((el, i) => (
          <li
            key={i}
            className="flex h-[50px] w-full items-center justify-between rounded-md border ps-3 text-center focus:ring-1"
          >
            <p>{el.title}</p>
            <Button
              type="button"
              className="aspect-square h-full  bg-transparent p-1 text-wpc-primary"
              onClick={() => handleDelete(i)}
            >
              <Cross1Icon className="text-wpc-error" width={15} height={15} />
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-x-4">
        <Input
          value={title}
          onKeyDown={onKeyDown}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          placeholder="내용을 입력해 주세요"
        />
        <Button
          type="button"
          className="h-fit p-4"
          onClick={() => handleAdd(title)}
        >
          <PlusIcon width="20" height="20" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionAddSelect;
