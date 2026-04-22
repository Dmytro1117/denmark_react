// 1. Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// 2. Redux
import { clearAuthError } from "../../redux/auth/authSlise";
import { changePassword } from "../../redux/auth/operationsAuth";
import {
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/authSelectors";

// 3. Components & UI
import { Loader } from "../Loader/Loader";
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

export const ChangePassword = ({ onClose, onSuccess, onCloseProfile }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const serverError = useSelector(selectAuthError);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const oldPasswordError = serverError?.fields?.oldPassword || null;
  const newPasswordError = serverError?.fields?.newPassword || null;
  const newPasswordConfirmError =
    serverError?.fields?.newPasswordConfirm || null;
  const generalError =
    !oldPasswordError && !newPasswordError && !newPasswordConfirmError
      ? serverError?.message
      : null;

  useEffect(() => {
    dispatch(clearAuthError());
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(changePassword({ oldPassword, newPassword, newPasswordConfirm }))
      .unwrap()
      .then(() => {
        setIsSuccess(true);
        onCloseProfile();
      })
      .catch(() => {});
  };

  return (
    <ModalContentWrapper>
      {isLoading && <Loader fullscreen={false} />}

      {isSuccess ? (
        <>
          <ModalText>Password successfully changed!</ModalText>
          <SharedActions>
            <StyledButton
              onClick={() => {
                onSuccess();
                onClose();
              }}
            >
              OK
            </StyledButton>
          </SharedActions>
        </>
      ) : (
        <SharedForm onSubmit={handleSubmit} noValidate>
          <ModalText>Enter your old and new passwords</ModalText>

          <FieldWrapper>
            <SharedInput
              type="password"
              placeholder="OLD PASSWORD"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              $hasError={!!oldPasswordError}
            />
            {oldPasswordError && (
              <SharedErrorText>{oldPasswordError}</SharedErrorText>
            )}
          </FieldWrapper>

          <FieldWrapper>
            <SharedInput
              type="password"
              placeholder="NEW PASSWORD"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              $hasError={!!newPasswordError}
            />
            {newPasswordError && (
              <SharedErrorText>{newPasswordError}</SharedErrorText>
            )}
          </FieldWrapper>

          <FieldWrapper>
            <SharedInput
              type="password"
              placeholder="CONFIRM NEW PASSWORD"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              $hasError={!!newPasswordConfirmError}
            />
            {newPasswordConfirmError && (
              <SharedErrorText>{newPasswordConfirmError}</SharedErrorText>
            )}
          </FieldWrapper>

          <GlobalError error={generalError} />

          <SharedActions>
            <StyledButton type="submit" disabled={isLoading}>
              Save Changes
            </StyledButton>
          </SharedActions>
        </SharedForm>
      )}
    </ModalContentWrapper>
  );
};
