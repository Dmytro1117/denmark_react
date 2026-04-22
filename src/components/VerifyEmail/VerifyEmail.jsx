// 1. Libraries
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// 2. Redux
import { verificationUser } from "../../redux/auth/operationsAuth";
import {
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/authSelectors";
import { clearAuthError } from "../../redux/auth/authSlise";

// 3. Components & UI
import { Modal } from "../Modal/Modal";
import { StyledButton } from "../Buttons/Button";
import { Loader } from "../Loader/Loader";
import { GlobalError } from "../GlobalError/GlobalError";

// 4. Styled Components
import { SharedActions } from "../../commonStyles/Form.styled";
import {
  ModalContentWrapper,
  ModalText,
  ModalHint,
} from "../../commonStyles/ModalNotification.styled";

export const VerifyEmail = () => {
  const { verificationToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const serverError = useSelector(selectAuthError);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!verificationToken) return;

    dispatch(verificationUser(verificationToken))
      .unwrap()
      .then(() => setIsSuccess(true))
      .catch(() => setIsSuccess(false));

    return () => dispatch(clearAuthError());
  }, [verificationToken, dispatch]);

  const handleClose = () => {
    navigate("/", { replace: true });
  };

  return (
    <Modal
      isOpen={true}
      isSmall
      onClose={handleClose}
      title={isSuccess ? "Verification Success" : "Verification Error"}
    >
      <ModalContentWrapper>
        {isLoading && <Loader fullscreen={false} />}

        {!isLoading && isSuccess && (
          <>
            <ModalText>
              Account successfully activated! You can now log in.
            </ModalText>

            <SharedActions>
              <StyledButton onClick={handleClose}>Log In</StyledButton>
            </SharedActions>
          </>
        )}

        {!isLoading && serverError && (
          <>
            <GlobalError
              error={serverError?.message || "Invalid or expired token"}
            />

            <ModalHint>
              This link is no longer valid. Please try sending a new one.
            </ModalHint>

            <SharedActions>
              <StyledButton
                onClick={() => navigate("/resend-email", { replace: true })}
              >
                Resend Link
              </StyledButton>
            </SharedActions>
          </>
        )}
      </ModalContentWrapper>
    </Modal>
  );
};
