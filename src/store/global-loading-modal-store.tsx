import { create } from "zustand";

type GlobalLoadingModal = {
  isOpen: boolean;
};

type GlobalLoadingModalActions = {
  onOpen: () => void;
  onClose: () => void;
};

export type GlobalModalStore = GlobalLoadingModal & GlobalLoadingModalActions;

const useGlobalLoadingModalStore = create<GlobalModalStore>((set) => ({
  isOpen: false,
  onClose() {
    set((state) => ({
      ...state,
      isOpen: false,
    }));
  },
  onOpen() {
    set((state) => ({
      ...state,
      isOpen: true,
    }));
  },
}));

export default useGlobalLoadingModalStore;
