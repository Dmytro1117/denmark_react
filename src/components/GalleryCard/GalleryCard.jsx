// 1. Libraries
import { useState } from "react";
import { ImBin } from "react-icons/im";

// 2. Components & UI
import { Spinner } from "../Loader/Loader.styled";
import { GlobalError } from "../GlobalError/GlobalError";

// 3. Styled Components
import { ErrorOverlay } from "../../commonStyles/Form.styled";
import { GridItem, CardSpinnerOverlay } from "./GalleryCard.styled";

export const GalleryCard = ({
  image,
  custom,
  variants,
  onClick,
  canDelete,
  onDelete,
  isDeleting,
  mode,
}) => {
  const [imgError, setImgError] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (isDeleting) return;
    onDelete(image._id);
  };

  return (
    <GridItem
      layout
      custom={custom}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={imgError ? undefined : onClick}
    >
      {mode === "delete" && canDelete && (
        <button
          type="button"
          onClick={handleDelete}
          aria-label="Видалити фото"
          disabled={isDeleting}
        >
          <ImBin size={18} />
        </button>
      )}

      {isDeleting && (
        <CardSpinnerOverlay onClick={(e) => e.stopPropagation()}>
          <Spinner />
        </CardSpinnerOverlay>
      )}

      {!imgError ? (
        <img
          src={image.url || image.src}
          alt={image.description}
          onError={() => setImgError(true)}
        />
      ) : (
        <ErrorOverlay>
          <GlobalError error="Images failed to load from server" />
        </ErrorOverlay>
      )}
    </GridItem>
  );
};
