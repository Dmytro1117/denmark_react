export const selectAllImages = (state) => state.gallery.items;

export const selectGalleryLoading = (state) => state.gallery.isLoading;

export const selectDeletingId = (state) => state.gallery.deletingId;

export const selectTotalItem = (state) => state.gallery.total;

export const selectGalleryError = (state) => state.gallery.error;

export const selectLightboxLoading = (state) => state.gallery.isLightboxLoading;

export const selectImagesForLightbox = (state) =>
  state.gallery.allPhotosForLightbox;
