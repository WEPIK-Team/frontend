"use client";

import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import { generateTags, UnionTag } from "@/lib/data/tag";
import { StepOneData } from "@/lib/schema/template-schema";

import TagItem from "./tag-item";
import { Input } from "../ui/input";

interface TagBoardProps {
  onTagSelected: UseFormSetValue<StepOneData>;
  storeTags: UnionTag[];
}

const TagBoard = ({ onTagSelected, storeTags }: TagBoardProps) => {
  const [tags, setTags] = useState<UnionTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<UnionTag[]>(storeTags);
  const [isTagListVisible, setIsTagListVisible] = useState(false);
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
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const existingTag = tags.find((tag) => tag.name === trimmedName);
    const isSelected = selectedTags.find((tag) => tag.name === trimmedName);

    if (!isSelected) {
      const newTag = existingTag || { name: trimmedName };
      setSelectedTags((prev) => [...prev, newTag]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(text);
      setText("");
    }
  };

  const handleTagListClick = (tag: UnionTag) => {
    addTag(tag.name);
    setText("");
  };

  const highlightText = (tagName: string, searchText: string) => {
    const parts = tagName.split(new RegExp(`(${searchText})`, "gi"));
    return (
      <span>
        {parts.map((part, idx) =>
          part.toLowerCase() === searchText.toLowerCase() ? (
            <span key={idx} className="text-wpc-primary">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const removeTag = (tag: UnionTag) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t.name !== tag.name));
  };

  const filteredTags = tags
    .filter((tag) => tag.name.includes(text))
    .sort((a, b) => {
      if (a.name.startsWith(text)) return -1;
      if (b.name.startsWith(text)) return 1;
      return 0;
    });

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-[18px] border border-wpc-gray2 p-[9px] ">
      {selectedTags.map((tag, idx) => (
        <TagItem key={idx} tag={tag} onRemoveTag={removeTag} />
      ))}
      <div className="relative">
        <Input
          type="text"
          value={text}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder="태그 추가"
          disabled={false}
          onFocus={() => setIsTagListVisible(true)}
          className="border-none p-2 outline-none"
        />
        {isTagListVisible && (
          <div className="absolute top-full z-10 mt-1 max-h-[132px] w-full overflow-y-scroll rounded-[16px]  bg-white p-[4px] shadow-lg">
            {filteredTags.map((tag, idx) => (
              <div
                key={idx}
                className="cursor-pointer rounded-[11px] p-2 hover:bg-[#6377DD]/10"
                onClick={() => handleTagListClick(tag)}
              >
                {highlightText(tag.name, text)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagBoard;
