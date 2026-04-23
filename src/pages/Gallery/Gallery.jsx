// 1. Libraries
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

// 2. Redux
import { clearGalleryError } from "../../redux/gallery/gallerySlise";
import {
  selectIsRefreshing,
  selectIsLoggedIn,
  selectToken,
} from "../../redux/auth/authSelectors";
import {
  selectAllImages,
  selectTotalItem,
  selectGalleryLoading,
  selectDeletingId,
} from "../../redux/gallery/gallerySelectors";
import {
  fetchGalleryImages,
  addGalleryPhotos,
  deleteGalleryPhoto,
  fetchAllImagesForLightbox,
} from "../../redux/gallery/operationsGallery";
import { clearGallery } from "../../redux/gallery/gallerySlise";

// 3. Components & UI
import { Pagination } from "../../components/Pagination/Pagination";
import { ServerError } from "../../components/ServerError/ServerError";
import { PageBackground } from "../../components/PageBackground/PageBackground";
import { ConfirmDialog } from "../../components/ConfirmDialog/ConfirmDialog";
import { StyledButton } from "../../components/Buttons/Button";
import { Modal } from "../../components/Modal/Modal";
import { AddGalleryForm } from "../../components/AddGalleryForm/AddGalleryForm";
import { GalleryCard } from "../../components/GalleryCard/GalleryCard";
import { EmptyPage } from "../../components/EmptyPage/EmptyPage";
import { Loader } from "../../components/Loader/Loader";

// 4. Helpers, Hooks & API
import {
  containerVariants,
  galleryItemVariants,
} from "../../helpers/animations";
import { useGallery } from "../../helpers/hooks";

// 5. Styled Components
import {
  PageSection,
  PageContainer,
  PageTitle,
} from "../../commonStyles/Page.styled";
import {
  GridContainer,
  GalleryTabsWrapper,
  GalleryWrapper,
} from "./Gallery.styled";

// 6. Lazy Components
const CustomLightbox = lazy(() => import("../../components/Lightbox/Lightbox"));

const limit = 9;

export const Gallery = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const total = useSelector(selectTotalItem);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const images = useSelector(selectAllImages);
  const isLoading = useSelector(selectGalleryLoading);
  const deletingId = useSelector(selectDeletingId);

  const [mode, setMode] = useState(null);
  const [page, setPage] = useState(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const {
    open,
    setOpen,
    index,
    slidesForLightbox,
    openLightbox,
    isEmptyGallery,
    serverError,
  } = useGallery(images);

  const isValidationError =
    serverError?.fields?.description || serverError?.fields?.galleryPhotos;
  const globalPageError =
    serverError && !isValidationError ? serverError : null;

  useEffect(() => {
    if (isRefreshing) return;
    if (token && !isLoggedIn) return;

    dispatch(clearGalleryError());
    dispatch(fetchGalleryImages({ page, limit }));
  }, [dispatch, isRefreshing, token, isLoggedIn, page]);

  useEffect(() => {
    dispatch(fetchAllImagesForLightbox());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearGallery());
    };
  }, [dispatch]);

  const handleUploadClick = () => {
    dispatch(clearGalleryError());
    setMode(null);
    fileInputRef.current?.click();
  };

  const handleUploadSubmit = (description) => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("galleryPhotos", file));
    formData.append("description", description);

    dispatch(addGalleryPhotos(formData))
      .unwrap()
      .then(() => {
        setIsUploadModalOpen(false);
        setSelectedFiles([]);
        if (page === 1) {
          dispatch(fetchGalleryImages({ page: 1, limit }));
        } else {
          setPage(1);
        }
      })
      .catch(() => {});

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;

    dispatch(deleteGalleryPhoto(deleteId))
      .unwrap()
      .then(() => {
        setDeleteId(null);
        const isLastItemOnPage = images.length === 1;
        const isNotFirstPage = page > 1;

        if (isLastItemOnPage && isNotFirstPage) {
          setPage((prev) => prev - 1);
        } else {
          dispatch(fetchGalleryImages({ page, limit }));
        }
      })
      .catch(() => {});
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setSelectedFiles(Array.from(e.target.files));
      setIsUploadModalOpen(true);
    }
  };

  const handleImageClick = async (imageId) => {
    try {
      await dispatch(fetchAllImagesForLightbox()).unwrap();
      openLightbox(imageId);
    } catch (error) {
      console.error("Failed to load lightbox images", error);
    }
  };

  const toggleDeleteMode = () =>
    setMode((prev) => (prev === "delete" ? null : "delete"));

  const isInitialLoading = isLoading && images.length === 0;
  const showContent = !isRefreshing && !isInitialLoading;

  return (
    <PageSection>
      <PageBackground />
      <PageContainer>
        <PageTitle>Gallery</PageTitle>

        {isLoading && images.length > 0 && <Loader fullscreen={false} />}

        <GalleryTabsWrapper>
          {isLoggedIn && (
            <>
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              {!globalPageError && (
                <>
                  <StyledButton onClick={handleUploadClick}>
                    + Add Photo
                  </StyledButton>
                  <StyledButton
                    active={mode === "delete"}
                    onClick={toggleDeleteMode}
                  >
                    Delete
                  </StyledButton>
                </>
              )}
            </>
          )}
        </GalleryTabsWrapper>

        {!showContent && !serverError ? (
          <Loader fullscreen={false} />
        ) : isEmptyGallery ? (
          <EmptyPage title="The gallery is empty" text="Add your first photo" />
        ) : (
          <GalleryWrapper>
            <AnimatePresence mode="wait">
              <GridContainer
                key={page}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {images.map((image, idx) => (
                  <GalleryCard
                    key={image._id}
                    mode={mode}
                    custom={idx}
                    image={image}
                    variants={galleryItemVariants}
                    layout
                    onClick={() => handleImageClick(image._id)}
                    isDeleting={deletingId === image._id}
                    canDelete={isLoggedIn && !image.isTemplate}
                    onDelete={setDeleteId}
                  />
                ))}
              </GridContainer>
            </AnimatePresence>

            <Pagination
              total={total}
              limit={limit}
              currentPage={page}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </GalleryWrapper>
        )}
      </PageContainer>

      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Photos"
        isSmall
      >
        <AddGalleryForm
          files={selectedFiles}
          onRePick={handleUploadClick}
          onSubmit={handleUploadSubmit}
        />
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        title="Delete Photo?"
        message="This action cannot be undone"
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deletingId === deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        error={serverError}
      />

      {open && (
        <Suspense fallback={null}>
          <CustomLightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={slidesForLightbox}
          />
        </Suspense>
      )}

      <ServerError error={globalPageError} isVisible={!isUploadModalOpen} />
    </PageSection>
  );
};

export default Gallery;
