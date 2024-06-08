import { createStore } from "zustand/vanilla";

import { IQuestionRequest } from "@/types/question";

export type QuestionState = {
  currentQuestionIndex: number;
  questions: IQuestionRequest[];
};

export type CounterActions = {
  nextQuestion: () => void;
  prevQuestion: () => void;
  moveIndexQuestion: (index: number) => void;
  updateQuestion: (newQuestions: IQuestionRequest[]) => void;
  clearStore: () => void;
};

export type QuestionStore = QuestionState & CounterActions;

const initQuestionStore = (questions: IQuestionRequest[]): QuestionState => ({
  currentQuestionIndex: 0,
  questions,
});

const defaultInitState: QuestionState = {
  currentQuestionIndex: 0,
  questions: [],
};

const createQuestionStore = (initState: QuestionState = defaultInitState) =>
  createStore<QuestionStore>()((set) => ({
    ...initState,
    nextQuestion: () =>
      set((state) => ({
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.questions.length - 1
        ),
      })),
    prevQuestion: () =>
      set((state) => {
        return {
          currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
        };
      }),
    moveIndexQuestion: (index: number) =>
      set(() => ({
        currentQuestionIndex: index,
      })),
    updateQuestion: (newQuestions) =>
      set(() => {
        return {
          questions: newQuestions,
        };
      }),
    clearStore: () => {
      localStorage.removeItem("question-storage");
    },
  }));

export { createQuestionStore, initQuestionStore };
