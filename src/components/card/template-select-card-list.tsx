"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

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
  const [sortByPopularity, setSortByPopularity] = useState(true);

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const filteredTemplateList = useMemo(() => {
    let updatedTemplateList =
      selectedTags.length > 0
        ? templateList.filter((template) =>
            selectedTags.every((tag) => template.templateTags.includes(tag))
          )
        : templateList;

    if (sortByPopularity) {
      updatedTemplateList = updatedTemplateList.sort(
        (a, b) => b.useCount - a.useCount
      );
    } else {
      updatedTemplateList = updatedTemplateList.sort(
        (a, b) => a.useCount - b.useCount
      );
    }

    return updatedTemplateList;
  }, [selectedTags, sortByPopularity, templateList]);

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
        onClick={() => setSortByPopularity((prev) => !prev)}
      >
        {sortByPopularity ? (
          <Image
            src="/images/icons/descend.png"
            alt="sortIcon"
            width={17}
            height={13}
          />
        ) : (
          <Image
            src="/images/icons/ascend.png"
            alt="sortIcon"
            width={17}
            height={13}
          />
        )}

        <p className="text-wpt-base-1">인기순</p>
      </div>
      <div className="grid grid-cols-12 gap-[14px] pt-3 font-pretendard">
        {filteredTemplateList.map((template, index) => (
          <div
            key={`${template.title}-${index}`}
            className="col-span-6 md:col-span-4"
          >
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
