// 1. Components & UI
import { Modal } from "../Modal/Modal";
import { Loader } from "../Loader/Loader";
import { StyledButton } from "../Buttons/Button";
import { GlobalError } from "../GlobalError/GlobalError";

// 2. Styled Components
import { SharedActions } from "../../commonStyles/Form.styled";
import {
  ModalContentWrapper,
  ModalText,
} from "../../commonStyles/ModalNotification.styled";

export const ConfirmDialog = ({
  isOpen,
  title = "Confirmation",
  message = "Are you sure?",
  confirmText = "Do it",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
  error: errorMessage,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} isSmall>
      <ModalContentWrapper>
        {isLoading && <Loader />}
        <ModalText>{message}</ModalText>

        <GlobalError error={errorMessage} />

        <SharedActions>
          <StyledButton onClick={onCancel} disabled={isLoading}>
            {cancelText}
          </StyledButton>

          <StyledButton onClick={onConfirm} disabled={isLoading}>
            {confirmText}
          </StyledButton>
        </SharedActions>
      </ModalContentWrapper>
    </Modal>
  );
};
