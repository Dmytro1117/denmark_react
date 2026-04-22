import { createAsyncThunk } from "@reduxjs/toolkit";
import denmarkAPI from "../../helpers/axiosConfig";

// GET /api/documents?country=ua|dk
export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async ({ country }, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.get("/documents", {
        params: { country },
      });
      return { country, documents: data.documents };
    } catch (error) {
      // Якщо бекенд повернув помилку з даними — віддаємо ВСІ дані (і message, і fields)
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      // Якщо це помилка мережі (Axios) — віддаємо просто текст
      return rejectWithValue({ message: error.message });
    }
  },
);

// POST /api/documents
export const addDocument = createAsyncThunk(
  "documents/addDocument",
  async ({ country, category, text, note = "" }, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.post("/documents", {
        country,
        category,
        text,
        note,
      });
      return data.document;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// PATCH /api/documents/:id/done
export const updateDocumentDone = createAsyncThunk(
  "documents/updateDone",
  async ({ id, done }, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.patch(`/documents/${id}/done`, {
        done,
      });
      return data.document;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// DELETE /api/documents/:id
export const deleteDocument = createAsyncThunk(
  "documents/deleteDocument",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.delete(`/documents/${id}`);
      return { id: data.document._id, country: data.document.country };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// PUT /api/documents/:id
export const updateDocument = createAsyncThunk(
  "documents/updateDocument",
  async ({ id, category, text, note }, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.put(`/documents/${id}`, {
        category,
        text,
        note,
      });
      return data.document;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);
