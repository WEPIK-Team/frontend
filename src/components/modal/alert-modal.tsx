"use client";

import { useEffect, useState } from "react";

import { Modal } from "./modal";

interface IAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  propagation?: boolean;
}

export const AlertModal: React.FC<IAlertModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  loading,
  propagation,
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
      propagation={propagation}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <button
          disabled={loading}
          onClick={onClose}
          className="h-fit rounded-[16px] bg-wpc-light-gray px-[30px] py-[13px] text-wpc-gray disabled:cursor-not-allowed disabled:opacity-70"
        >
          취소
        </button>
        <button
          disabled={loading}
          onClick={onConfirm}
          className="h-fit rounded-[16px] bg-wpc-error px-[30px] py-[13px] text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          확인
        </button>
      </div>
    </Modal>
  );
};
