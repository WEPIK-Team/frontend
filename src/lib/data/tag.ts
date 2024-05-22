import { faker } from "@faker-js/faker";

export interface BaseTag {
  id: string;
  name: string;
}

export interface BaseTag {
  id: string;
  name: string;
}

export type TagNameOnly = Pick<BaseTag, "name">;

export type UnionTag = BaseTag | TagNameOnly;

export function generateTag() {
  return {
    id: faker.string.uuid(),
    name: faker.word.adjective({ length: { min: 2, max: 6 } }),
  };
}

export function generateTags(count = 10) {
  const tags = [];
  for (let i = 0; i < count; i++) {
    tags.push(generateTag());
  }
  return tags;
}
