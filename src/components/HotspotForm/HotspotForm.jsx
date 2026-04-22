// 1. Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// 2. Redux
import { fetchAllImagesForLightbox } from "../../redux/gallery/operationsGallery";
import {
  selectGalleryLoading,
  selectLightboxLoading,
} from "../../redux/gallery/gallerySelectors";
import { selectHotspotsActionLoading } from "../../redux/map/mapSelectors";
import { clearHotspotError } from "../../redux/map/mapSlice";
import { hotspotCategories } from "../../helpers/constant";

// 3. Components & UI
import { Loader } from "../Loader/Loader";
import { GalleryPicker } from "../GalleryPicker/GalleryPicker";
import { StyledButton } from "../Buttons/Button";
import { GlobalError } from "../GlobalError/GlobalError";

// 4. Styled Components
import { SharedActions } from "../../commonStyles/Form.styled";
import {
  Form,
  FieldWrapper,
  Label,
  Input,
  SelectWrapper,
  Select,
  InlineRow,
  ContentRow,
  PhotoBox,
  Textarea,
  ErrorText,
} from "./HotspotForm.styled";

export const HotspotForm = ({
  mapType,
  position,
  onSubmit,
  onDelete,
  initialValues,
  isEdit = false,
  errors,
}) => {
  const dispatch = useDispatch();

  const isLoadingHotspot = useSelector(selectHotspotsActionLoading);
  const isLoadingGallery = useSelector(selectGalleryLoading);
  const isLoadingGalleryPicker = useSelector(selectLightboxLoading);

  const [name, setName] = useState(initialValues?.name || "");
  const [category, setCategory] = useState(initialValues?.category || "city");
  const [description, setDescription] = useState(
    initialValues?.description || "",
  );
  const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl || "");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const { nameError, descError, categoryError, photoError, generalError } =
    errors;

  useEffect(() => {
    dispatch(clearHotspotError());
    return () => {
      dispatch(clearHotspotError());
    };
  }, [dispatch]);

  const handleOpenPicker = async () => {
    try {
      await dispatch(fetchAllImagesForLightbox()).unwrap();

      setIsPickerOpen(true);
    } catch (error) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      mapType,
      name: name.trim(),
      category,
      description: description.trim(),
      imageUrl,
      position,
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate>
        {isLoadingHotspot && <Loader fullscreen={false} />}

        <InlineRow>
          <FieldWrapper>
            <Label>Name point</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Copenhagen"
              $hasError={!!nameError}
              required
            />
            {nameError && <ErrorText>{nameError}</ErrorText>}
          </FieldWrapper>
          <FieldWrapper>
            <Label>Category</Label>
            <SelectWrapper>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                $hasError={!!categoryError}
              >
                {hotspotCategories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </SelectWrapper>
            {categoryError && <ErrorText>{categoryError}</ErrorText>}
          </FieldWrapper>
        </InlineRow>

        <ContentRow>
          <FieldWrapper>
            <Label>Photo</Label>
            <PhotoBox $hasError={!!photoError} onClick={handleOpenPicker}>
              {imageUrl ? (
                <img src={imageUrl} alt="preview" />
              ) : (
                <span>Click to add photo</span>
              )}
            </PhotoBox>
            {photoError && <ErrorText>{photoError}</ErrorText>}
          </FieldWrapper>

          <FieldWrapper>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed information about the object..."
              required
              $hasError={!!descError}
            />
            {descError && <ErrorText>{descError}</ErrorText>}
          </FieldWrapper>
        </ContentRow>

        <GlobalError error={generalError} />

        <SharedActions>
          {isEdit && (
            <StyledButton
              variant="danger"
              onClick={() => onDelete(initialValues._id)}
            >
              Delete point
            </StyledButton>
          )}

          <StyledButton onClick={handleOpenPicker} disabled={isLoadingGallery}>
            {imageUrl ? "Change photo" : "Add photo"}
          </StyledButton>
          <StyledButton type="submit" disabled={isLoadingHotspot}>
            {isEdit ? "Save changes" : "Create point"}
          </StyledButton>
        </SharedActions>
      </Form>

      {isLoadingGalleryPicker && <Loader fullscreen={false} />}

      <GalleryPicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onPick={(src) => setImageUrl(src)}
      />
    </>
  );
};
