import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { UnionTag } from "@/lib/data/tag";

interface TagItemProps {
  tag: UnionTag;
  selectedTags: UnionTag[];
  handleSelectTag: (tagName: string) => void;
}

const tagStyles = cva("bg-wpc-primary-grad px-1", {
  variants: {
    isSelected: {
      true: "text-blue-500",
      false: "text-black",
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
      {tag.name}
    </div>
  );
};

export default TagItem;
