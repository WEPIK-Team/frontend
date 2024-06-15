import { getTempleteDetail } from "@/lib/api/template";

import TemplateForm from "@/components/manage/template-form";

export default async function EditTemplatePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const template = await getTempleteDetail(parseInt(id));

  return <TemplateForm template={template} />;
}
