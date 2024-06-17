import TemplateForm from "@/components/manage/template-form";

import { TemplateStoreProvider } from "@/provider/template-store-provider";

export default function CreateTemplatePage() {
  return (
    <TemplateStoreProvider>
      <TemplateForm mode="create" />
    </TemplateStoreProvider>
  );
}
