"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/modal/modal";

import TemplateForm from "./template-form";

interface ManageTemplateModalProps {
  mode: "create" | "edit";
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const ManageTemplateModal = ({
  mode,
  isOpen,
  onConfirm,
  onClose,
  loading,
}: ManageTemplateModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const modeTitle = `${mode === "create" ? "템플릿 생성" : "템플릿 수정"}`;

  return (
    <Modal title={modeTitle} desc="" isOpen={isOpen} onClose={onClose}>
      <TemplateForm />
    </Modal>
  );
};
