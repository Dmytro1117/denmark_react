// 1. Libraries
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// 2. Redux
import {
  selectUser,
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/authSelectors";
import { clearAuthError, clearAuth } from "../../redux/auth/authSlise";
import { updateAvatar, deleteAccount } from "../../redux/auth/operationsAuth";

// 3. Components & UI
import { Loader } from "../Loader/Loader";
import { StyledButton } from "../Buttons/Button";
import { GlobalError } from "../GlobalError/GlobalError";
import { UserProfileDocItem } from "../UserProfileDocItem/UserProfileDocItem";
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";

// 4. Helpers, Hooks & API
import { useGallery } from "../../helpers/hooks";

// 5. Styled Components
import {
  DetailedContainer,
  Sidebar,
  AvatarBox,
  MainContent,
  HeaderInfo,
  UserName,
  UserEmail,
  DataSection,
  StatBlock,
  Label,
  DocumentationSection,
  HiddenInput,
  Value,
  ControlPanel,
} from "./UserProfileDetailed.styled";

export const UserProfileDetailed = ({
  onClose,
  openChangePassword,
  studyData,
  documentsData,
  onLogout,
}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const serverError = useSelector(selectAuthError);
  const user = useSelector(selectUser);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const avatarFileRef = useRef(null);

  const { totalImages } = useGallery();

  const avatarError = serverError?.fields?.avatar || null;

  const generalError =
    !avatarError && serverError?.message ? serverError.message : null;

  useEffect(() => {
    dispatch(clearAuthError());
    return () => dispatch(clearAuthError());
  }, [dispatch]);

  const handlePickAvatar = () => {
    if (isLoading) return;

    if (serverError) dispatch(clearAuthError());

    avatarFileRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Диспатчим оновлення. Помилка  впаде в Redux-стейт (serverError)
      await dispatch(updateAvatar(file)).unwrap();
    } catch (error) {
    } finally {
      e.target.value = "";
    }
  };

  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteAccount()).unwrap();

      dispatch(clearAuth());
      onClose();
    } catch (e) {}
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
  };

  return (
    <DetailedContainer>
      <Sidebar>
        <AvatarBox>
          {isLoading && <Loader fullscreen={false} />}
          <img src={user.avatar} alt={user.name} />
          <HiddenInput
            ref={avatarFileRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </AvatarBox>
      </Sidebar>

      <MainContent>
        <HeaderInfo>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </HeaderInfo>

        <DataSection>
          <StatBlock>
            <Label>Gallery:</Label>
            <Value>{totalImages} photos</Value>
          </StatBlock>

          <StatBlock>
            <Label>Study ({studyData.currentLevel}):</Label>
            <Value>{studyData.actualPercentProgress}%</Value>
          </StatBlock>

          <DocumentationSection>
            <Label>Documentation:</Label>
            {documentsData.map((doc) => (
              <UserProfileDocItem key={doc.value} doc={doc} />
            ))}
          </DocumentationSection>
        </DataSection>

        <GlobalError error={avatarError || generalError} />
      </MainContent>

      <ControlPanel>
        <StyledButton variant="danger" onClick={handleDelete}>
          Delete Account
        </StyledButton>
        <StyledButton onClick={handlePickAvatar}>Change Avatar</StyledButton>
        <StyledButton onClick={openChangePassword}>
          Change Password
        </StyledButton>

        <StyledButton onClick={onLogout}>Logout</StyledButton>
        <StyledButton onClick={onClose}>Close</StyledButton>
      </ControlPanel>

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete account"
        message="This action cannot be undone. Are you sure?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isLoading}
        error={generalError}
      />
    </DetailedContainer>
  );
};
