import { getTempleteDetail } from "@/lib/api/template";

import TemplateForm from "@/components/manage/template-form";

import { TemplateFormStore } from "@/store/template/template-form-store";

import { TemplateStoreProvider } from "@/provider/template-store-provider";

export default async function EditTemplatePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const template = await getTempleteDetail(parseInt(id));

  const propsData: Partial<TemplateFormStore> = {
    templateInfo: {
      title: template.title,
      storedName: template.imageURL,
      tags: template.templateTags,
    },
    templateQuestions: {
      usedQuestions: template.questions,
      unUsedQuestions: [],
    },
  };

  return (
    <TemplateStoreProvider {...propsData}>
      <TemplateForm mode="edit" />
    </TemplateStoreProvider>
  );
}
