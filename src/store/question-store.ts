import { createStore } from "zustand/vanilla";

import { IQuestionRequest } from "@/types/question";

export type QuestionState = {
  currentQuestionIndex: number;
  previousQuestionIndex: number;
  questions: IQuestionRequest[];
};

export type CounterActions = {
  nextQuestion: () => void;
  prevQuestion: () => void;
  moveIndexQuestion: (index: number) => void;
  changeQuestionValue: ({ id, value }: { id: number; value: string }) => void;
  updateQuestion: (newQuestions: IQuestionRequest[]) => void;
  clearStore: () => void;
};

export type QuestionStore = QuestionState & CounterActions;

const initQuestionStore = (questions: IQuestionRequest[]): QuestionState => ({
  currentQuestionIndex: 0,
  previousQuestionIndex: 0,
  questions,
});

const defaultInitState: QuestionState = {
  currentQuestionIndex: 0,
  previousQuestionIndex: 0,
  questions: [],
};

const createQuestionStore = (initState: QuestionState = defaultInitState) =>
  createStore<QuestionStore>()((set) => ({
    ...initState,
    nextQuestion: () =>
      set((state) => ({
        previousQuestionIndex: state.currentQuestionIndex,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.questions.length - 1
        ),
      })),
    prevQuestion: () =>
      set((state) => ({
        previousQuestionIndex: state.currentQuestionIndex,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      })),
    changeQuestionValue: ({ id, value }) =>
      set((state) => {
        const newValueQuestions = state.questions.map((question) => {
          if (question.id === id) {
            return { ...question, content: value };
          }
          return question;
        });

        return {
          questions: newValueQuestions,
        };
      }),
    moveIndexQuestion: (index: number) =>
      set((state) => ({
        previousQuestionIndex: state.currentQuestionIndex,
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
