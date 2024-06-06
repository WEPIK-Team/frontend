import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HelpModalState {
  isVisited: boolean;
}

interface HelpModalStateActions {
  openModal: () => void;
  closeModal: () => void;
}

export type UserInfoStore = HelpModalState & HelpModalStateActions;

const useHelpModalStore = create<UserInfoStore>()(
  persist<UserInfoStore>(
    (set) => ({
      isVisited: false,
      openModal: () => set({ isVisited: true }),
      closeModal: () => set({ isVisited: false }),
    }),
    {
      name: "help-modal-store",
      getStorage: () => localStorage,
    }
  )
);

export default useHelpModalStore;
