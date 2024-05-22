import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { UnionTag } from "@/lib/data/tag";

interface TagItemProps {
  tag: UnionTag;
  selectedTags: UnionTag[];
  handleSelectTag: (tagName: string) => void;
}

const tagStyles = cva("px-1 cursor-pointer", {
  variants: {
    isSelected: {
      true: "text-black",
      false: "text-muted-foreground/70",
    },
  },
});

const TagItem = ({ tag, selectedTags, handleSelectTag }: TagItemProps) => {
  const isSelected = selectedTags.some(
    (selectedTag) => selectedTag.name === tag.name
  );

  return (
    <div
      className={cn(tagStyles({ isSelected }))}
      onClick={() => handleSelectTag(tag.name)}
    >
      #{tag.name}
    </div>
  );
};

export default TagItem;
