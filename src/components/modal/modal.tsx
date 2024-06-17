"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { PropagationStopper } from "../common/propagation-stopper ";

interface ModalProps {
  title: string;
  desc: string;
  propagation?: boolean;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  desc,
  propagation,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <PropagationStopper propagation={propagation}>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="max-h-[650px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-wpt-xl">{title}</DialogTitle>
            <DialogDescription>{desc}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </PropagationStopper>
  );
};
