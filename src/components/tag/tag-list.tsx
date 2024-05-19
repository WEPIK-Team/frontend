"use client";

import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import { generateTags, UnionTag } from "@/lib/data/tag";
import { CreateTemplateValues } from "@/lib/schema/template-schema";

import TagItem from "./tag-item";
import { Input } from "../ui/input";

interface TagListProps {
  onTagSelected: UseFormSetValue<CreateTemplateValues>;
}

const TagList = ({ onTagSelected }: TagListProps) => {
  const [tags, setTags] = useState<UnionTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<UnionTag[]>([]);
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    setText(val);
  };

  useEffect(() => {
    const initialTags = generateTags();
    setTags(initialTags);
  }, []);

  useEffect(() => {
    onTagSelected("tags", selectedTags);
  }, [selectedTags, onTagSelected]);

  const addTag = (name: string) => {
    const existingNames = tags.map((tag) => tag.name);

    if (existingNames.indexOf(name.trim()) >= 0) {
      return;
    }

    setTags((prevTags) => {
      return [...prevTags, { name }];
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(text);
      setText("");
    }
  };

  const handleSelectTag = (tagName: string) => {
    setSelectedTags((prevSelectedTags) => {
      const tagIndex = prevSelectedTags.findIndex(
        (tag) => tag.name === tagName
      );

      // 선택된 태그가 이미 있다면
      if (tagIndex !== -1) {
        const updatedSelectedTags = [...prevSelectedTags];

        updatedSelectedTags.splice(tagIndex, 1);

        setTags((prevTags) => {
          const selectedTags = prevTags.filter((tag) =>
            prevSelectedTags.some(
              (selectedTag) => selectedTag.name === tag.name
            )
          );
          const remainingTags = prevTags.filter(
            (tag) => !selectedTags.includes(tag)
          );
          return [...selectedTags, ...remainingTags];
        });

        return updatedSelectedTags;
      } else {
        const updatedSelectedTags = [...prevSelectedTags, { name: tagName }];

        setTags((prevTags) => {
          const remainingTags = prevTags.filter(
            (tag) =>
              !updatedSelectedTags.some(
                (selectedTag) => selectedTag.name === tag.name
              )
          );

          return [...updatedSelectedTags, ...remainingTags];
        });
        return updatedSelectedTags;
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-1">
      {tags.map((tag, idx) => (
        <TagItem
          key={idx}
          tag={tag}
          handleSelectTag={handleSelectTag}
          selectedTags={selectedTags}
        />
      ))}
      <Input
        type="text"
        value={text}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder="태그 추가"
        className="w-24"
      />
    </div>
  );
};

export default TagList;
