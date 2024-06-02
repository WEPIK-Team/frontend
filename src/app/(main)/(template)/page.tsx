import { getTagList, getTemplateList } from "@/lib/api/template";

import { TemplateSelectCardList } from "@/components/card/template-select-card-list";

export default async function Template() {
  const templateList = await getTemplateList();
  const tagList = await getTagList();

  return (
    <>
      <TemplateSelectCardList tagList={tagList} templateList={templateList} />
    </>
  );
}
