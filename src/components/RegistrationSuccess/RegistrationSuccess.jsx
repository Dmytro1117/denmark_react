// 1. Libraries
import { useDispatch } from "react-redux";

// 2. Redux
import { clearAuthError } from "../../redux/auth/authSlise";

// 3. Components & UI
import { StyledButton } from "../Buttons/Button";

// 4. Styled Components
import {
  ModalContentWrapper,
  ModalText,
  ModalHint,
} from "../../commonStyles/ModalNotification.styled";
import { SharedActions } from "../../commonStyles/Form.styled";

export const RegistrationSuccess = ({ userEmail, onClose }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearAuthError());
    onClose();
  };

  return (
    <ModalContentWrapper>
      <ModalText>
        Registration successful! We've sent a verification link to{" "}
        <b>{userEmail}</b>
      </ModalText>

      <ModalHint>
        Please check your inbox (and Spam folder) to activate your account.
      </ModalHint>

      <SharedActions>
        <StyledButton onClick={handleClose}>OK</StyledButton>
      </SharedActions>
    </ModalContentWrapper>
  );
};
