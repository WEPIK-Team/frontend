import { createStore } from "zustand/vanilla";

export type QuestionState = {
  currentQuestionIndex: number;
  questions: any[];
};

export type CounterActions = {
  nextQuestion: () => void;
  prevQuestion: () => void;
  moveIndexQuestion: (index: number) => void;
  updateQuestion: (id: string, newValue: string) => void;
};

export type QuestionStore = QuestionState & CounterActions;

const initQuestionStore = (questions: any[]): QuestionState => ({
  currentQuestionIndex: 0,
  questions,
});

const defaultInitState: QuestionState = {
  currentQuestionIndex: 0,
  questions: [],
};

const createQuestionStore = (initState: QuestionState = defaultInitState) =>
  createStore<QuestionStore>((set) => ({
    ...initState,
    nextQuestion: () =>
      set((state) => {
        return {
          currentQuestionIndex: Math.min(
            state.currentQuestionIndex + 1,
            state.questions.length - 1
          ),
        };
      }),
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
    updateQuestion: (id: string, newValue: string) =>
      set((state) => {
        return {
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, content: newValue } : q
          ),
        };
      }),
  }));

export { createQuestionStore, initQuestionStore };
