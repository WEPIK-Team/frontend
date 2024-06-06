"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

import {
  createQuestionStore,
  initQuestionStore,
  QuestionStore,
} from "@/store/question-store";

import { IQuestionRequest } from "@/types/question";

interface QuestionStoreProviderProps {
  children: ReactNode;
  questions: IQuestionRequest[];
}

const QuestionStoreContext = createContext<StoreApi<QuestionStore> | null>(
  null
);

const QuestionStoreProvider = ({
  children,
  questions,
}: QuestionStoreProviderProps) => {
  const storeRef = useRef<StoreApi<QuestionStore>>();

  if (!storeRef.current) {
    storeRef.current = createQuestionStore(initQuestionStore(questions));
  }

  return (
    <QuestionStoreContext.Provider value={storeRef.current}>
      {children}
    </QuestionStoreContext.Provider>
  );
};

const useQuestionStore = <T,>(selector: (store: QuestionStore) => T): T => {
  const questionStoreContext = useContext(QuestionStoreContext);

  if (!questionStoreContext) {
    throw new Error(
      "useQuestionStore must be used within a QuestionStoreProvider"
    );
  }

  return useStore(questionStoreContext, selector);
};

export { QuestionStoreContext, QuestionStoreProvider, useQuestionStore };
