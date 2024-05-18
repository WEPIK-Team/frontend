import { TemplateSelectCard } from "@/components/card/template-select-card";

import { Templates } from "@/constants/dump";

export default function Home() {
  return (
    <>
      <div className="grid h-full grid-cols-12 gap-[14px] pt-3 font-pretendard font-semibold">
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
