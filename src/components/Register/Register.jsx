// 1. Libraries
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// 2. Redux
import { clearAuthError } from "../../redux/auth/authSlise";
import {
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/authSelectors";
import { register } from "../../redux/auth/operationsAuth";

// 3. Components & UI

import { Loader } from "../Loader/Loader";
import { RegistrationSuccess } from "../RegistrationSuccess/RegistrationSuccess";
import { GlobalError } from "../GlobalError/GlobalError";
import { Modal } from "../Modal/Modal";
import { StyledButton } from "../Buttons/Button";

// 4. Styled Components
import {
  SharedForm,
  SharedActions,
  SharedInput,
  FieldWrapper,
  SharedErrorText,
  RemindtWrapper,
  RemaindtLink,
  GlobalErrorBox,
} from "../../commonStyles/Form.styled";
import { FileSection, FileName, HiddenInput } from "./Register.styled";

export const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const fileRef = useRef(null);

  const isLoading = useSelector(selectIsLoading);
  const serverError = useSelector(selectAuthError);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [emailToDisplay, setemailToDisplay] = useState("");

  // serverError — це об'єкт { message, fields: { email, password } }
  const emailError = serverError?.fields?.email || null;
  const passError = serverError?.fields?.password || null;
  const nameError = serverError?.fields?.name || null;
  const avatarError = serverError?.fields?.avatar || null;

  // Загальна помилка (якщо це не помилка валідації полів, а наприклад 401)
  const generalError =
    !emailError && !passError && !nameError ? serverError?.message : null;

  useEffect(() => {
    //  Чистим відразу, як тільки форма відкрилася (щоб прибрати хвости від модалок)
    dispatch(clearAuthError());

    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (serverError) {
      dispatch(clearAuthError());
    }

    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "avatar":
        setAvatar(files[0]);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setemailToDisplay(email);

    dispatch(register({ name, email, password, avatar }))
      .unwrap()
      .then(() => {
        setIsSuccessModalOpen(true);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
        if (fileRef.current) fileRef.current.value = "";
      })
      .catch(() => {});
  };

  return (
    <>
      <SharedForm onSubmit={handleSubmit} noValidate>
        {isLoading && <Loader fullscreen={false} />}

        <FieldWrapper>
          <SharedInput
            name="name"
            value={name}
            placeholder="ENTER NAME"
            onChange={handleChange}
            $hasError={!!nameError}
          />

          {nameError && <SharedErrorText>{nameError}</SharedErrorText>}
        </FieldWrapper>

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

        <FileSection>
          <FileName $isError={!!avatarError}>
            {avatar ? `IMAGE: ${avatar.name}` : "AVATAR: NOT SELECTED"}
          </FileName>

          {avatarError && <GlobalErrorBox>{avatarError}</GlobalErrorBox>}

          <HiddenInput
            ref={fileRef}
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
          />
        </FileSection>

        <RemindtWrapper>
          <RemaindtLink
            type="button"
            onClick={() => navigate("/resend-email", { replace: true })}
          >
            Send verification email again
          </RemaindtLink>
        </RemindtWrapper>

        {!avatarError && <GlobalError error={generalError} />}

        <SharedActions>
          <StyledButton type="button" onClick={() => fileRef.current?.click()}>
            Pick Avatar
          </StyledButton>
          <StyledButton type="submit" disabled={isLoading}>
            Sign Up
          </StyledButton>
        </SharedActions>
      </SharedForm>

      <Modal
        isOpen={isSuccessModalOpen}
        isSmall
        onClose={() => setIsSuccessModalOpen(false)}
        title="Registration Success"
      >
        <RegistrationSuccess
          userEmail={emailToDisplay}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      </Modal>
    </>
  );
};
