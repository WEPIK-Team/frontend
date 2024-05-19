"use client";

import { useEffect, useState } from "react";

import { generateTags, UnionTag } from "@/lib/data/tag";

import TagItem from "./tag-item";
import { Input } from "../ui/input";

const TagList = () => {
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
      setText(""); // 태그가 추가되면 입력란 비우기
    }
  };

  const handleSelectTag = (tagName: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.some((tag) => tag.name === tagName)) {
        return prevTags;
      }
      return [...prevTags, { name: tagName }];
    });

    // setTags((prevTags) => {
    //   const tagIndex = prevTags.findIndex((tag) => tag.name === tagName);
    //   if (tagIndex === -1) {
    //     return prevTags;
    //   }
    //   let copy = [...prevTags];

    //   const selectedTag = prevTags.splice(tagIndex, 1);
    //   return [selectedTag, ...prevTags];
    // });
  };

  console.log(selectedTags);

  return (
    <div className="text-f flex flex-wrap gap-1">
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
      />
    </div>
  );
};

export default TagList;
