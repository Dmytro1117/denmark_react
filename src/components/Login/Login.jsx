// 1. Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// 2. Redux
import { loginization } from "../../redux/auth/operationsAuth";
import { clearAuthError } from "../../redux/auth/authSlise";
import {
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/authSelectors";

// 3. Components & UI
import { StyledButton } from "../Buttons/Button";
import { Modal } from "../Modal/Modal";
import { Loader } from "../Loader/Loader";
import { ForgotPassword } from "../ForgotPassword/ForgotPassword";
import { GlobalError } from "../GlobalError/GlobalError";

// 4. Styled Components
import {
  SharedForm,
  SharedActions,
  SharedInput,
  FieldWrapper,
  SharedErrorText,
  RemindtWrapper,
  RemaindtLink,
} from "../../commonStyles/Form.styled";

export const Login = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const serverError = useSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const emailError = serverError?.fields?.email || null;
  const passError = serverError?.fields?.password || null;
  const generalError = !emailError && !passError ? serverError?.message : null;

  useEffect(() => {
    dispatch(clearAuthError());

    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(loginization({ email, password }))
      .unwrap()
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch(() => {});
  };

  const openReset = () => {
    dispatch(clearAuthError());
    setIsResetModalOpen(true);
  };

  return (
    <>
      <SharedForm onSubmit={handleSubmit} noValidate>
        {isLoading && <Loader fullscreen={false} />}

        <FieldWrapper>
          <SharedInput
            type="email"
            name="email"
            value={email}
            placeholder="ENTER EMAIL"
            onChange={handleChange}
            $hasError={!!emailError}
          />
          {emailError && <SharedErrorText>{emailError}</SharedErrorText>}
        </FieldWrapper>

        <FieldWrapper>
          <SharedInput
            type="password"
            name="password"
            value={password}
            placeholder="ENTER PASSWORD"
            onChange={handleChange}
            $hasError={!!passError}
          />
          {passError && <SharedErrorText>{passError}</SharedErrorText>}
        </FieldWrapper>

        <RemindtWrapper>
          <RemaindtLink type="button" onClick={openReset}>
            Forgot password?
          </RemaindtLink>
        </RemindtWrapper>

        <GlobalError error={generalError} />

        <SharedActions>
          <StyledButton type="submit" disabled={isLoading}>
            Log In
          </StyledButton>
        </SharedActions>
      </SharedForm>

      <Modal
        isOpen={isResetModalOpen}
        isSmall
        onClose={() => setIsResetModalOpen(false)}
        title="Password reset"
      >
        <ForgotPassword onClose={() => setIsResetModalOpen(false)} />
      </Modal>
    </>
  );
};
