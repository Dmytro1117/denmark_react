// 1. Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// 2. Redux
import { clearAuthError } from "../../redux/auth/authSlise";
import {
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/authSelectors";
import { resetPassword } from "../../redux/auth/operationsAuth";

// 3. Components & UI
import { Loader } from "../Loader/Loader";
import { Modal } from "../Modal/Modal";
import { StyledButton } from "../Buttons/Button";
import { GlobalError } from "../GlobalError/GlobalError";

// 4. Styled Components
import {
  SharedForm,
  FieldWrapper,
  SharedInput,
  SharedErrorText,
  SharedActions,
} from "../../commonStyles/Form.styled";
import {
  ModalContentWrapper,
  ModalText,
} from "../../commonStyles/ModalNotification.styled";

export const ResetPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { resetToken } = useParams();

  const isLoading = useSelector(selectIsLoading);
  const serverError = useSelector(selectAuthError);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordError = serverError?.fields?.password || null;
  const confirmError = serverError?.fields?.passwordConfirm || null;
  const generalError =
    !passwordError && !confirmError ? serverError?.message : null;

  useEffect(() => {
    dispatch(clearAuthError());
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ resetToken, password, passwordConfirm }))
      .unwrap()
      .then(() => setIsSuccess(true))
      .catch(() => {});
  };

  const handleClose = () => navigate("/", { replace: true });

  return (
    <Modal
      isOpen={true}
      isSmall
      onClose={handleClose}
      title={isSuccess ? "Reset Password Success" : "Reset Password"}
    >
      <ModalContentWrapper>
        {isLoading && <Loader fullscreen={false} />}

        {isSuccess ? (
          <>
            <ModalText>
              Your password has been successfully reset! You can now log in
            </ModalText>
            <SharedActions>
              <StyledButton onClick={handleClose}>Log In</StyledButton>
            </SharedActions>
          </>
        ) : (
          <SharedForm onSubmit={handleSubmit} noValidate>
            <ModalText>Enter and confirm your new password below</ModalText>

            <FieldWrapper>
              <SharedInput
                type="password"
                placeholder="NEW PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                $hasError={!!passwordError}
              />
              {passwordError && (
                <SharedErrorText>{passwordError}</SharedErrorText>
              )}
            </FieldWrapper>

            <FieldWrapper>
              <SharedInput
                type="password"
                placeholder="CONFIRM PASSWORD"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                $hasError={!!confirmError}
              />
              {confirmError && (
                <SharedErrorText>{confirmError}</SharedErrorText>
              )}
            </FieldWrapper>

            <GlobalError error={generalError} />

            <SharedActions>
              <StyledButton type="submit" disabled={isLoading}>
                Save Сhanges
              </StyledButton>
            </SharedActions>
          </SharedForm>
        )}
      </ModalContentWrapper>
    </Modal>
  );
};
