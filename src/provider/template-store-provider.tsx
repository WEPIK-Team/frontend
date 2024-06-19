"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  createTemplateFormStore,
  TemplateFormStore,
} from "@/store/template/template-form-store";

export const TemplateStoreContext =
  createContext<StoreApi<TemplateFormStore> | null>(null);

export interface TemplateStoreProviderProps {
  children: ReactNode;
}

export const TemplateStoreProvider = ({
  children,
  ...props
}: TemplateStoreProviderProps) => {
  const storeRef = useRef<StoreApi<TemplateFormStore>>();
  if (!storeRef.current) {
    storeRef.current = createTemplateFormStore(props);
  }

  return (
    <TemplateStoreContext.Provider value={storeRef.current}>
      {children}
    </TemplateStoreContext.Provider>
  );
};

export const useTemplateFormStore = <T,>(
  selector: (store: TemplateFormStore) => T
): T => {
  const templateStoreContext = useContext(TemplateStoreContext);

  if (!templateStoreContext) {
    throw new Error(
      `useTemplateFormStore must be use within TemplateStoreProvider`
    );
  }

  return useStore(templateStoreContext, selector);
};
