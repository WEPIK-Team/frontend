import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

interface TagItemProps {
  tag: string;
  onRemoveTag: (tag: string) => void;
}

const tagStyles = cva(
  "py-[5px] px-[10px] cursor-pointer border border-wpc-primary rounded-[18px] text-wpc-primary flex justify-center items-center gap-2",
  {
    variants: {},
  }
);

const TagItem = ({ tag, onRemoveTag }: TagItemProps) => {
  return (
    <div className={cn(tagStyles())}>
      <span>{tag}</span>
      <div onClick={() => onRemoveTag(tag)}>&times;</div>
    </div>
  );
};

export default TagItem;
