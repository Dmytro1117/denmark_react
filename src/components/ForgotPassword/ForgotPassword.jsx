// 1. Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// 2. Redux
import { forgotPassword } from "../../redux/auth/operationsAuth";
import { clearAuthError } from "../../redux/auth/authSlise";
import {
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/authSelectors";

// 3. Components & UI
import { GlobalError } from "../GlobalError/GlobalError";
import { StyledButton } from "../Buttons/Button";
import { Loader } from "../Loader/Loader";

// 4. Styled Components
import {
  ModalContentWrapper,
  ModalText,
} from "../../commonStyles/ModalNotification.styled";
import {
  SharedForm,
  FieldWrapper,
  SharedInput,
  SharedErrorText,
  SharedActions,
} from "../../commonStyles/Form.styled";

export const ForgotPassword = ({ onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const serverError = useSelector(selectAuthError);

  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const emailError = serverError?.fields?.email || null;
  const generalError = !emailError ? serverError?.message : null;

  useEffect(() => {
    dispatch(clearAuthError());

    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleResetSubmit = (event) => {
    event.preventDefault();
    dispatch(forgotPassword(resetEmail))
      .unwrap()
      .then(() => setResetSent(true))
      .catch(() => {});
  };

  return (
    <ModalContentWrapper>
      {isLoading && <Loader />}

      {resetSent ? (
        <ModalContentWrapper>
          <ModalText>
            The letter was sent successfully. Please check your mailbox,
            including your Spam folder.
          </ModalText>
          <SharedActions>
            <StyledButton onClick={onClose}>OK</StyledButton>
          </SharedActions>
        </ModalContentWrapper>
      ) : (
        <SharedForm onSubmit={handleResetSubmit} noValidate>
          <ModalText>
            Enter your email. The system will send instructions for restoring
            access.
          </ModalText>

          <FieldWrapper>
            <SharedInput
              type="email"
              placeholder="EMAIL ADDRESS"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              $hasError={!!emailError}
            />
            {emailError && <SharedErrorText>{emailError}</SharedErrorText>}
          </FieldWrapper>

          <GlobalError error={generalError} />

          <SharedActions>
            <StyledButton type="submit" disabled={isLoading}>
              Send
            </StyledButton>
            <StyledButton onClick={onClose}>Cancel</StyledButton>
          </SharedActions>
        </SharedForm>
      )}
    </ModalContentWrapper>
  );
};
