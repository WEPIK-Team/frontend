import { useTemplateFormStore } from "@/provider/template-store-provider";

export default function useTemplate() {
  const currentStep = useTemplateFormStore((state) => state.currentStep);
  const increment = useTemplateFormStore((state) => state.increment);
  const decrement = useTemplateFormStore((state) => state.decrement);
  const templateInfo = useTemplateFormStore((state) => state.templateInfo);
  const questionIds = useTemplateFormStore((state) =>
    state.templateQuestions.usedQuestions.map((q) => q.id)
  );
  const templateQuestions = useTemplateFormStore(
    (state) => state.templateQuestions
  );
  const setTemplateInfo = useTemplateFormStore(
    (state) => state.setTemplateInfo
  );
  const resetAllStates = useTemplateFormStore((state) => state.resetAllStates);
  const setUsedQuestions = useTemplateFormStore(
    (state) => state.setUsedQuestions
  );
  const setUnusedQuestions = useTemplateFormStore(
    (state) => state.setUnusedQuestions
  );
  const setQuestions = useTemplateFormStore((state) => state.setQuestions);
  const moveQuestion = useTemplateFormStore((state) => state.moveQuestion);
  const fetchUnusedQuestions = useTemplateFormStore(
    (state) => state.fetchUnusedQuestions
  );
  const dragEndQuestions = useTemplateFormStore(
    (state) => state.dragEndQuestions
  );

  return {
    currentStep,
    increment,
    decrement,
    templateInfo,
    templateQuestions,
    questionIds,
    setTemplateInfo,
    resetAllStates,
    setUsedQuestions,
    setUnusedQuestions,
    setQuestions,
    moveQuestion,
    fetchUnusedQuestions,
    dragEndQuestions,
  };
}
