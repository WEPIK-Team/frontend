"use client";

import { useEffect, useState } from "react";

import { Modal } from "./modal";
import { Button } from "../ui/button";

interface IAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<IAlertModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="정말로 삭제 하시겠습니까?"
      desc="삭제하시면 데이터를 되돌리실 수 없습니다."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          확인
        </Button>
      </div>
    </Modal>
  );
};
