// 1. Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// 2. Redux
import { clearGalleryError } from "../../redux/gallery/gallerySlise";
import {
  selectGalleryError,
  selectGalleryLoading,
} from "../../redux/gallery/gallerySelectors";

// 3. Components & UI
import { StyledButton } from "../Buttons/Button";
import { Loader } from "../Loader/Loader";
import { GlobalError } from "../GlobalError/GlobalError";

// 4. Styled Components
import {
  ModalContentWrapper,
  ModalText,
  ModalHint,
} from "../../commonStyles/ModalNotification.styled";
import {
  SharedForm,
  FieldWrapper,
  SharedErrorText,
  SharedActions,
  SharedTextarea,
} from "../../commonStyles/Form.styled";

export const AddGalleryForm = ({ files, onSubmit, onRePick }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectGalleryLoading);
  const serverError = useSelector(selectGalleryError);

  const descError = serverError?.fields?.description || null;
  const photoError = serverError?.fields?.galleryPhotos || null;
  const generalError = !descError && !photoError ? serverError?.message : null;

  useEffect(() => {
    return () => {
      dispatch(clearGalleryError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(description);
  };

  return (
    <ModalContentWrapper>
      <SharedForm onSubmit={handleSubmit} noValidate>
        {isLoading && <Loader fullscreen={false} />}
        <ModalText>Photo Title</ModalText>

        <FieldWrapper>
          <SharedTextarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Min 2 characters..."
            $hasError={!!descError}
          />
          {descError && <SharedErrorText>{descError}</SharedErrorText>}
        </FieldWrapper>
        <ModalHint>Files ready to upload: {files.length}</ModalHint>

        <GlobalError error={photoError} />

        <GlobalError error={generalError} />

        <SharedActions>
          {(photoError || generalError) && (
            <StyledButton onClick={onRePick}>Pick Other Files</StyledButton>
          )}
          <StyledButton type="submit" disabled={isLoading}>
            Upload Now
          </StyledButton>
        </SharedActions>
      </SharedForm>
    </ModalContentWrapper>
  );
};
