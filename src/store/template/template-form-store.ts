import { create, createStore } from "zustand";

import { getManageQuestionList } from "@/lib/api/manage-question";

import { TemplateInfo } from "@/lib/schema/template-schema";

import { ColumnType, IQuestion } from "@/types/question";

export type TemplateFormStore = {
  currentStep: number;
  prevStep: number;
  templateInfo: TemplateInfo;
  templateQuestions: Questions;
  resetAllStates: () => void;
  increment: () => void;
  decrement: () => void;
  setTemplateInfo: (data: TemplateInfo) => void;
  setUsedQuestions: (quetions: IQuestion[]) => void;
  setUnusedQuestions: (quetions: IQuestion[]) => void;
  setQuestions: (columnType: ColumnType, newQuestions: IQuestion[]) => void;
  moveQuestion: (questionId: number) => void;
  fetchUnusedQuestions: () => Promise<void>;
  dragEndQuestions: (questionId: string, before: string) => void;
};

type Questions = {
  usedQuestions: IQuestion[];
  unUsedQuestions: IQuestion[];
};

export const initialTemplateInfo = {
  title: "",
  tags: [],
  storedName: "",
};

export const initialQuestionsData = {
  usedQuestions: [],
  unUsedQuestions: [],
};

export const createTemplateFormStore = (
  initProps?: Partial<TemplateFormStore>
) => {
  return createStore<TemplateFormStore>()((set, get) => ({
    currentStep: 0,
    prevStep: 0,
    templateInfo: initialTemplateInfo,
    templateQuestions: initialQuestionsData,
    ...initProps,
    resetAllStates: () => {
      set(() => ({
        currentStep: 0,
        prevStep: 0,
        templateInfo: initialTemplateInfo,
        templateQuestions: initialQuestionsData,
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
    setTemplateInfo: (data: TemplateInfo) =>
      set(() => ({
        templateInfo: data,
      })),
    setUsedQuestions: (quetions: IQuestion[]) =>
      set((state) => ({
        templateQuestions: {
          ...state.templateQuestions,
          usedQuestions: quetions,
        },
      })),
    setUnusedQuestions: (quetions: IQuestion[]) =>
      set((state) => ({
        templateQuestions: {
          ...state.templateQuestions,
          unUsedQuestions: quetions,
        },
      })),
    fetchUnusedQuestions: async () => {
      const questionList = await getManageQuestionList();
      const usedQuestionIds = new Set(
        get().templateQuestions.usedQuestions.map((q) => q.id)
      );
      const unUsedQuestions = questionList.filter(
        (question) => !usedQuestionIds.has(question.id)
      );

      set((state) => ({
        templateQuestions: {
          ...state.templateQuestions,
          unUsedQuestions,
        },
      }));
    },
    setQuestions: (columnType: ColumnType, newQuestions: IQuestion[]) =>
      set((state) => {
        if (columnType === ColumnType.Use) {
          return {
            templateQuestions: {
              ...state.templateQuestions,
              usedQuestions: newQuestions,
            },
          };
        } else if (columnType === ColumnType.Unused) {
          return {
            questions: {
              ...state.templateQuestions,
              unUsedQuestions: newQuestions,
            },
          };
        }
        return state;
      }),

    moveQuestion: (questionId: number) =>
      set((state) => {
        const { usedQuestions, unUsedQuestions } = state.templateQuestions;

        const used = [...usedQuestions];
        const unused = [...unUsedQuestions];

        let cardToMove: IQuestion | undefined;
        let sourceArray: IQuestion[], destinationArray: IQuestion[];

        if (used.some((q) => q.id === questionId)) {
          sourceArray = used;
          destinationArray = unused;
        } else if (unused.some((q) => q.id === questionId)) {
          sourceArray = unused;
          destinationArray = used;
        } else {
          return {};
        }

        const questionIndex = sourceArray.findIndex((q) => q.id === questionId);
        if (questionIndex === -1) return {};

        // eslint-disable-next-line prefer-const
        [cardToMove] = sourceArray.splice(questionIndex, 1);
        destinationArray.push(cardToMove);

        return {
          templateQuestions: {
            usedQuestions: used,
            unUsedQuestions: unused,
          },
        };
      }),

    dragEndQuestions: (questionId: string, before: string) => {
      set((state) => {
        const { usedQuestions, unUsedQuestions } = state.templateQuestions;

        let question = null;

        const findAndRemoveQuestion = (list: IQuestion[], id: string) => {
          const index = list.findIndex((q) => String(q.id) === id);
          return index !== -1 ? list.splice(index, 1)[0] : null;
        };

        question =
          findAndRemoveQuestion(usedQuestions, questionId) ||
          findAndRemoveQuestion(unUsedQuestions, questionId);

        const moveToBack = before === "-1";

        if (question) {
          if (moveToBack) {
            usedQuestions.push(question);
          } else {
            const insertIndex = usedQuestions.findIndex(
              (q) => String(q.id) === before
            );
            if (insertIndex !== -1) {
              usedQuestions.splice(insertIndex, 0, question);
            } else {
              usedQuestions.push(question);
            }
          }
        }

        return {
          ...state,
          questions: {
            ...state.templateQuestions,
            usedQuestions: [...usedQuestions],
            unUsedQuestions: [...unUsedQuestions],
          },
        };
      });
    },
  }));
};
const useTemplateFormStore = create<TemplateFormStore>();

export default useTemplateFormStore;
