import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGalleryImages,
  addGalleryPhotos,
  deleteGalleryPhoto,
  fetchAllImagesForLightbox,
} from "./operationsGallery";

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    items: [],
    allPhotosForLightbox: [],
    total: 0,
    isLoading: false,
    isLightboxLoading: false,
    error: null,
    deletingId: null,
  },
  reducers: {
    clearGallery: (state) => {
      state.items = [];
      state.total = 0;
      state.isLoading = false;
      state.error = null;
      state.deletingId = null;
    },
    clearGalleryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH PHOTOS
      .addCase(fetchGalleryImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGalleryImages.fulfilled, (state, action) => {
        state.items = action.payload.images;
        state.total = action.payload.total;
        state.isLoading = false;
      })
      .addCase(fetchGalleryImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // FETCH FOR LIGHTBOX
      .addCase(fetchAllImagesForLightbox.pending, (state) => {
        state.isLightboxLoading = true;
      })
      .addCase(fetchAllImagesForLightbox.fulfilled, (state, action) => {
        state.allPhotosForLightbox = action.payload;
        state.isLightboxLoading = false;
      })
      .addCase(fetchAllImagesForLightbox.rejected, (state, action) => {
        state.isLightboxLoading = false;
        state.error = action.payload;
      })

      // ADD PHOTOS
      .addCase(addGalleryPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGalleryPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...action.payload, ...state.items];
        const newSlides = action.payload.map((img) => ({
          _id: img._id,
          src: img.src,
          title: img.alt || "Gallery",
        }));

        state.allPhotosForLightbox = [
          ...newSlides,
          ...state.allPhotosForLightbox,
        ];

        state.total += action.payload.length;
      })
      .addCase(addGalleryPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // DELETE PHOTOS
      .addCase(deleteGalleryPhoto.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deleteGalleryPhoto.fulfilled, (state, action) => {
        state.deletingId = null;
        state.items = state.items.filter((img) => img._id !== action.payload);
        state.allPhotosForLightbox = state.allPhotosForLightbox.filter(
          (img) => img._id !== action.payload,
        );
        state.total -= 1;
      })
      .addCase(deleteGalleryPhoto.rejected, (state, action) => {
        state.deletingId = null;
        state.error = action.payload;
      });
  },
});

export const { clearGallery, clearGalleryError } = gallerySlice.actions;

export const galleryReducer = gallerySlice.reducer;
