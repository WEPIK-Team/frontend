import { TemplateSelectCard } from "@/components/card/template-select-card";
import { Separator } from "@/components/ui/separator";

import ManegeTemplateHeader from "../../../../components/manage/manage-template-header";
import { getTemplateList } from "@/lib/api/template";

export default async function TemplatePage() {
  const templateList = await getTemplateList();

  return (
    <main className="py-10">
      <ManegeTemplateHeader />
      <Separator className="mb-5 mt-10" />

      <div className="grid grid-cols-12 gap-[14px] pt-3 font-pretendard">
        {templateList?.map((template) => (
          <div key={template.title} className="col-span-3">
            <TemplateSelectCard
              isAdmin
              id={template.id}
              imageURL={template.imageURL}
              title={template.title}
              templateTags={template.templateTags}
              useCount={template.useCount}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
