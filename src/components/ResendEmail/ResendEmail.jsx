// 1. Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// 2. Redux
import { resendVerification } from "../../redux/auth/operationsAuth";
import {
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/authSelectors";
import { clearAuthError } from "../../redux/auth/authSlise";

// 3. Components & UI
import { Loader } from "../Loader/Loader";
import { Modal } from "../Modal/Modal";
import { GlobalError } from "../GlobalError/GlobalError";
import { StyledButton } from "../Buttons/Button";

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

export const ResendEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const serverError = useSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const emailError = serverError?.fields?.email || null;
  const generalError = !emailError ? serverError?.message : null;

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(resendVerification(email.trim())).unwrap();
      setIsSuccess(true);
    } catch {}
  };

  const handleClose = () => navigate("/", { replace: true });

  return (
    <Modal
      isOpen={true}
      isSmall
      onClose={handleClose}
      title={isSuccess ? "Resend Success" : "Resend email"}
    >
      <ModalContentWrapper>
        {isLoading && <Loader fullscreen={false} />}

        {isSuccess ? (
          <>
            <ModalText>
              A confirmation email has been successfully sent to your email.
              Please check your Spam folder if you don't see the message.
            </ModalText>
            <SharedActions>
              <StyledButton onClick={handleClose}>OK</StyledButton>
            </SharedActions>
          </>
        ) : (
          <SharedForm onSubmit={handleSubmit} noValidate>
            <ModalText>
              Enter the address to resend the activation link
            </ModalText>

            <FieldWrapper>
              <SharedInput
                type="email"
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                $hasError={!!emailError}
              />
              {emailError && <SharedErrorText>{emailError}</SharedErrorText>}
            </FieldWrapper>

            <GlobalError error={generalError} />

            <SharedActions>
              <StyledButton type="submit" disabled={isLoading}>
                Send Email
              </StyledButton>
            </SharedActions>
          </SharedForm>
        )}
      </ModalContentWrapper>
    </Modal>
  );
};
