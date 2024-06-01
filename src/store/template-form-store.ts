import { create } from "zustand";

import { StepOneData, StepTwoData } from "@/lib/schema/template-schema";

type TemplateFormData = {
  currentStep: number;
  prevStep: number;
  stepOneData: StepOneData;
  stepTwoData: StepTwoData;
  increment: () => void;
  decrement: () => void;
  setStepOneData: (data: StepOneData) => void;
  setStepTwoData: (data: StepTwoData) => void;
};

export const initialStepOneData = {
  title: "",
  tags: [],
  thumbnail: undefined,
};

export const initialStepTwoData = {
  questions: [],
};

const useTemplateFormStore = create<TemplateFormData>((set) => ({
  currentStep: 0,
  prevStep: 0,
  stepOneData: initialStepOneData,
  stepTwoData: initialStepTwoData,
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
}));

export default useTemplateFormStore;
