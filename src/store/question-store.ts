import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import { IQuestion } from "@/types/question";

export type QuestionState = {
  currentQuestionIndex: number;
  questions: IQuestion[];
};

export type CounterActions = {
  nextQuestion: () => void;
  prevQuestion: () => void;
  moveIndexQuestion: (index: number) => void;
  updateQuestion: ({ id, newValue }: Record<"id" | "newValue", string>) => void;
  clearStore: () => void;
};

export type QuestionStore = QuestionState & CounterActions;

const initQuestionStore = (questions: IQuestion[]): QuestionState => ({
  currentQuestionIndex: 0,
  questions,
});

const defaultInitState: QuestionState = {
  currentQuestionIndex: 0,
  questions: [],
};

const createQuestionStore = (initState: QuestionState = defaultInitState) =>
  createStore<QuestionStore>()(
    persist<QuestionStore>(
      (set) => ({
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
            if (state.currentQuestionIndex === 0) return {};
            return {
              currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
            };
          }),
        moveIndexQuestion: (index: number) =>
          set(() => ({
            currentQuestionIndex: index,
          })),
        updateQuestion: ({ id, newValue }: Record<"id" | "newValue", string>) =>
          set((state) => ({
            questions: state.questions.map((q) =>
              q.id === id ? { ...q, content: newValue } : q
            ),
          })),
        clearStore: () => {
          localStorage.removeItem("question-storage");
          return set(() => ({
            ...defaultInitState,
          }));
        },
      }),
      {
        name: "question-storage",
        getStorage: () => localStorage,
      }
    )
  );

export { createQuestionStore, initQuestionStore };
