import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { UnionTag } from "@/lib/data/tag";

interface TagItemProps {
  tag: UnionTag;
  onRemoveTag: (tag: UnionTag) => void;
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
      <span>{tag.name}</span>
      <div onClick={() => onRemoveTag(tag)}>&times;</div>
    </div>
  );
};

export default TagItem;
