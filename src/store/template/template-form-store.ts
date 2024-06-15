import { create } from "zustand";

import { StepOneData, StepTwoData } from "@/lib/schema/template-schema";

import { IQuestion } from "@/types/question";

type TemplateFormData = {
  currentStep: number;
  prevStep: number;
  stepOneData: StepOneData;
  stepTwoData: StepTwoData;
  resetAllStates: () => void;
  increment: () => void;
  decrement: () => void;
  setStepOneData: (data: StepOneData) => void;
  setStepTwoData: (data: StepTwoData) => void;
  setUsedQuestionIds: (quetions: IQuestion[]) => void;
  setUnusedQuestionIds: (quetions: IQuestion[]) => void;
};

export const initialStepOneData = {
  title: "",
  tags: [],
  storedName: "",
};

export const initialStepTwoData = {
  questionIds: [],
};

const useTemplateFormStore = create<TemplateFormData>((set) => ({
  currentStep: 0,
  prevStep: 0,
  stepOneData: initialStepOneData,
  stepTwoData: initialStepTwoData,
  resetAllStates: () => {
    set(() => ({
      currentStep: 0,
      prevStep: 0,
      stepOneData: initialStepOneData,
      stepTwoData: initialStepTwoData,
    }));
  },
  increment: () =>
    set((state) => ({
      currentStep: state.currentStep + 1,
      prevStep: state.currentStep,
    })),
  decrement: () =>
    set((state) => ({
      currentStep: state.currentStep - 1,
      prevStep: state.currentStep,
    })),
  setStepOneData: (data: StepOneData) =>
    set(() => ({
      stepOneData: data,
    })),
  setStepTwoData: (data: StepTwoData) =>
    set(() => ({
      stepTwoData: data,
    })),
  setUsedQuestionIds: (quetions: IQuestion[]) =>
    set((state) => ({
      stepTwoData: {
        ...state.stepTwoData,
        usedQuestions: quetions,
      },
    })),
  setUnusedQuestionIds: (quetions: IQuestion[]) =>
    set((state) => ({
      stepTwoData: {
        ...state.stepTwoData,
        unusedQuestions: quetions,
      },
    })),
}));

export default useTemplateFormStore;
