import { ReactNode } from "react";
import {
  Modal as NextModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
  footer: ReactNode;
  size: "3xl";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  content,
  footer,
  size,
}: ModalProps) {
  return (
    <>
      <NextModal
        isOpen={isOpen}
        onClose={onClose}
        className="m-auto"
        size={size}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{content}</ModalBody>
              <ModalFooter>{footer}</ModalFooter>
            </>
          )}
        </ModalContent>
      </NextModal>
    </>
  );
}
