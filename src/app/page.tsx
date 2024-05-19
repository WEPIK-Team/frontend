import { CaretSortIcon } from "@radix-ui/react-icons";

import { TemplateSelectCard } from "@/components/card/template-select-card";
import { TemplateTag } from "@/components/tag/template-tag";

import { Tags, Templates } from "@/constants/dump";

export default function Home() {
  return (
    <>
      <div className="my-3 flex flex-wrap gap-2">
        {Tags.map((tag) => (
          <div key={tag}>
            <TemplateTag label={tag} />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-1">
        <CaretSortIcon className="h-5 w-5" />
        <p>인기순</p>
      </div>
      <div className="grid grid-cols-12 gap-[14px] pt-3 font-pretendard">
        {Templates.map((template) => (
          <div key={template.title} className="col-span-6 md:col-span-4">
            <TemplateSelectCard
              image={template.image}
              title={template.title}
              tag={template.tag}
              views={template.views}
            />
          </div>
        ))}
      </div>
    </>
  );
}
