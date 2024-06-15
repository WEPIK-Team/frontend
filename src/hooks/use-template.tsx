import useTemplateFormStore from "@/store/template/template-form-store";

export default function useTemplate() {
  // values
  const currentStep = useTemplateFormStore((state) => state.currentStep);
  const increment = useTemplateFormStore((state) => state.increment);
  const decrement = useTemplateFormStore((state) => state.decrement);
  const stepOneData = useTemplateFormStore((state) => state.stepOneData);
  const stepTwoData = useTemplateFormStore((state) => state.stepTwoData);
  const setStepOneData = useTemplateFormStore((state) => state.setStepOneData);
  const resetAllStates = useTemplateFormStore((state) => state.resetAllStates);

  return {
    currentStep,
    increment,
    decrement,
    stepOneData,
    stepTwoData,
    setStepOneData,
    resetAllStates,
  };
}
