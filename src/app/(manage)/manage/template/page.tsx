"use client";

import { TemplateSelectCard } from "@/components/card/template-select-card";
import { Separator } from "@/components/ui/separator";

import { Templates } from "@/constants/dump";

import ManegeTemplateHeader from "../../../../components/manage/manage-template-header";

export default function TemplatePage() {
  return (
    <main className="py-10">
      <ManegeTemplateHeader />
      <Separator className="mb-5 mt-10" />

      <div className="grid grid-cols-12 gap-[14px] pt-3 font-pretendard">
        {Templates?.map((template) => (
          <div key={template.title} className="col-span-3">
            <TemplateSelectCard
              isAdmin
              image={template.image}
              title={template.title}
              tag={template.tag}
              views={template.views}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
