import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HelpModalState {
  isVisited: boolean;
  isOpen: boolean;
}

interface HelpModalStateActions {
  openModal: () => void;
  closeModal: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export type UserInfoStore = HelpModalState & HelpModalStateActions;

const useHelpModalStore = create<UserInfoStore>()(
  persist<UserInfoStore>(
    (set) => ({
      isVisited: false,
      isOpen: false,
      openModal: () => set({ isVisited: true }),
      closeModal: () => set({ isVisited: false }),
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "help-modal-store",
      getStorage: () => localStorage,
    }
  )
);

export default useHelpModalStore;
