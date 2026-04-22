// 1. Libraries
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { RiCloseLargeFill } from "react-icons/ri";

// 2. Helpers, Hooks & API
import { modalBackdropVariants, modalVariants } from "../../helpers/animations";

// 3. Styled Components
import {
  Backdrop,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
} from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export const Modal = ({ onClose, children, title, isOpen, isSmall }) => {
  // реф, щоб запам'ятати, де почався клік
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.code === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = "auto";
    };
  }, [onClose, isOpen]);

  const handleMouseDown = (e) => {
    // Запам'ятовуєм елемент, на якому натиснули мишку
    backdropRef.current = e.target;
  };

  const handleMouseUp = (e) => {
    // Закриваємо тільки якщо:
    // 1. Почали клік на бекдропі (mousedown)
    // 2. Відпустили на бекдропі (mouseup)
    // 3. Це саме той елемент Backdrop
    if (
      backdropRef.current === e.currentTarget &&
      e.target === e.currentTarget
    ) {
      onClose();
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          key="modal-backdrop"
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <ModalContent
            variants={modalVariants}
            $isSmall={isSmall}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <CloseButton onClick={onClose} aria-label="Close modal window">
                <RiCloseLargeFill size={22} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </ModalContent>
        </Backdrop>
      )}
    </AnimatePresence>,
    modalRoot,
  );
};
