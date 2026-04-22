// 1. Libraries
import { useSelector } from "react-redux";

// 2. Components & UI
import { Modal } from "../Modal/Modal";
import { StyledButton } from "../Buttons/Button";

// 3. Redux
import {
  selectImagesForLightbox,
  selectGalleryLoading,
} from "../../redux/gallery/gallerySelectors";

// 4. Styled Components
import { SharedActions } from "../../commonStyles/Form.styled";
import {
  ModalContentWrapper,
  ModalText,
  ModalHint,
} from "../../commonStyles/ModalNotification.styled";
import { Grid, Item } from "./GalleryPicker.styled";

export const GalleryPicker = ({ isOpen, onClose, onPick }) => {
  const imagesForLightbox = useSelector(selectImagesForLightbox) || [];
  const isLoading = useSelector(selectGalleryLoading);

  const isEmpty = imagesForLightbox.length === 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isSmall={isEmpty}
      title={isEmpty ? "Empty Gallery" : "Select Photo"}
    >
      {isEmpty ? (
        <ModalContentWrapper>
          <ModalText>Your gallery is empty</ModalText>
          <ModalHint>Add photos to the gallery first</ModalHint>

          <SharedActions>
            <StyledButton onClick={onClose} disabled={isLoading}>
              OK
            </StyledButton>
          </SharedActions>
        </ModalContentWrapper>
      ) : (
        <Grid>
          {imagesForLightbox.map((img) => (
            <Item
              key={img._id}
              type="button"
              onClick={() => {
                onPick(img.src);
                onClose();
              }}
              aria-label="Select Photo"
            >
              <img src={img.src} alt={img.alt || "photo"} loading="lazy" />
            </Item>
          ))}
        </Grid>
      )}
    </Modal>
  );
};
