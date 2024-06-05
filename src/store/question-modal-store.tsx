import { create } from "zustand";

export type QuestionModalType = "DELETE" | "EDIT";

type QuestionModal = {
  targetId: string | null;
  isDeleteOpen: boolean;
  isEditOpen: boolean;
};

type QuestionModalActions = {
  onOpen: (type: QuestionModalType) => void;
  onClose: (type: QuestionModalType) => void;
  setTargetId: (id: string) => void;
  clearTargetId: () => void;
};

export type QuestionModalStore = QuestionModal & QuestionModalActions;

const useQuestionModalStore = create<QuestionModalStore>((set) => ({
  targetId: "",
  isDeleteOpen: false,
  isEditOpen: false,
  onClose(type) {
    set((state) => ({
      ...state,
      isDeleteOpen: type === "DELETE" ? false : state.isDeleteOpen,
      isEditOpen: type === "EDIT" ? false : state.isEditOpen,
      targetId: null,
    }));
  },
  onOpen(type) {
    set(() => ({
      isDeleteOpen: type === "DELETE",
      isEditOpen: type === "EDIT",
    }));
  },
  setTargetId(id) {
    set(() => ({
      targetId: id,
    }));
  },
  clearTargetId() {
    set(() => ({
      targetId: null,
    }));
  },
}));

export default useQuestionModalStore;
