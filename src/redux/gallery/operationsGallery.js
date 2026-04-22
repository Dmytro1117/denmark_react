import { createAsyncThunk } from "@reduxjs/toolkit";
import denmarkAPI from "../../helpers/axiosConfig";

// GET
export const fetchGalleryImages = createAsyncThunk(
  "gallery/fetchAll",
  async ({ page = 1, limit = 9 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.get(
        `/gallery?page=${page}&limit=${limit}`,
      );

      const formattedData = data.images.map((img) => ({
        ...img,
        src: img.url,
        alt: img.description,
      }));

      return { images: formattedData, total: data.total };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// GET (for lightbox)
export const fetchAllImagesForLightbox = createAsyncThunk(
  "gallery/fetchAllForLightbox",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.get(`/gallery?page=1&limit=500`);

      return data.images.map((img) => ({
        _id: img._id,
        src: img.url,
        title: img.description || "Gallery",
      }));
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// ADD
export const addGalleryPhotos = createAsyncThunk(
  "gallery/addPhotos",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.post("/gallery", formData);

      return data.images.map((img) => ({
        ...img,
        src: img.url,
        alt: img.description || "",
      }));
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }

      // ЯКЩО МЕРЕЖА РОЗІРВАЛА З'ЄДНАННЯ:
      if (error.message === "Network Error" || !error.response) {
        return rejectWithValue({
          message:
            "File is too large or connection lost. Please check file size (max 5MB).",
        });
      }

      return rejectWithValue({ message: error.message });
    }
  },
);

// DELETE
export const deleteGalleryPhoto = createAsyncThunk(
  "gallery/deletePhoto",
  async (photoId, { rejectWithValue }) => {
    try {
      await denmarkAPI.delete(`/gallery/${photoId}`);
      return photoId;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);
