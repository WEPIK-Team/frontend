"use client";

import useTemplateFormStore from "@/store/template-form-store";

import TemplateFormStepOne from "./template-form-step-1";
import TemplateFormStepTwo from "./template-form-step-2";

const steps = [
  { step: <TemplateFormStepOne /> },
  { step: <TemplateFormStepTwo /> },
];

const TemplateForm = () => {
  const { currentStep } = useTemplateFormStore();

  return <>{steps[currentStep].step}</>;
};

export default TemplateForm;
