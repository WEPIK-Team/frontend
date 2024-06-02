"use client";

import Image from "next/image";
import { useState } from "react";

import { TemplateSelectCard } from "@/components/card/template-select-card";
import { TemplateTag } from "@/components/tag/template-tag";

import { TemplateList } from "@/types/template";

export function TemplateSelectCardList({
  tagList,
  templateList,
}: {
  tagList: string[];
  templateList: TemplateList;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortByPopularity, setSortByPopularity] = useState(false);

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  let filteredTemplateList =
    selectedTags.length > 0
      ? templateList.filter((template) =>
          selectedTags.every((tag) => template.templateTags.includes(tag))
        )
      : templateList;

  if (sortByPopularity) {
    filteredTemplateList = filteredTemplateList
      .slice()
      .sort((a, b) => b.useCount - a.useCount);
  }

  return (
    <>
      <div className="my-3 flex flex-wrap gap-2">
        {tagList.map((tag) => (
          <div key={tag} onClick={() => handleTagSelect(tag)}>
            <TemplateTag label={tag} />
          </div>
        ))}
      </div>
      <div
        className="flex cursor-pointer items-center justify-end gap-[5px]"
        onClick={() => setSortByPopularity(!sortByPopularity)}
      >
        <Image src="svgs/sort.svg" alt="sortIcon" width={12} height={12} />
        <p className="text-wpt-base-1">인기순</p>
      </div>
      <div className="grid grid-cols-12 gap-[14px] pt-3 font-pretendard">
        {filteredTemplateList.map((template) => (
          <div key={template.title} className="col-span-6 md:col-span-4">
            <TemplateSelectCard
              id={template.id}
              imageURL={template.imageURL}
              title={template.title}
              templateTags={template.templateTags}
              useCount={template.useCount}
              selectedTags={selectedTags}
            />
          </div>
        ))}
      </div>
    </>
  );
}
