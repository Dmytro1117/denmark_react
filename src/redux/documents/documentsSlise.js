import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDocuments,
  addDocument,
  updateDocumentDone,
  deleteDocument,
  updateDocument,
} from "./operationsDocuments";

const setPending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const setRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload ?? action.error?.message ?? "Unknown error";
};

const setActionPending = (state) => {
  state.isActionLoading = true;
  state.error = null;
};

const setActionRejected = (state, action) => {
  state.isActionLoading = false;
  state.error = action.payload ?? action.error?.message ?? "Unknown error";
};

const initialState = {
  items: { ua: [], dk: [] },
  isLoading: false,
  isInitialLoading: false,
  isActionLoading: false,
  error: null,
  updatingId: null,
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,

  reducers: {
    clearDocuments: (state) => {
      state.items.ua = [];
      state.items.dk = [];
      state.isLoading = false;
      state.error = null;
    },

    clearDocsError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchDocuments.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        // Дістаємо країну, яку зараз запитуємо
        const requestedCountry = action.meta.arg.country;
        // Якщо в ЦІЙ країні ще немає даних — вмикаємо початковий лоадер
        if (state.items[requestedCountry].length === 0) {
          state.isInitialLoading = true;
        }
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        const { country, documents } = action.payload;
        state.items[country] = documents;
        state.isLoading = false;
        state.isInitialLoading = false;
        state.error = null;
      })
      .addCase(fetchDocuments.rejected, setRejected)

      // ADD
      .addCase(addDocument.pending, setActionPending)
      .addCase(addDocument.fulfilled, (state, action) => {
        const doc = action.payload;
        const country = doc.country;
        state.items[country] = [doc, ...state.items[country]];
        state.isActionLoading = false;
      })
      .addCase(addDocument.rejected, setActionRejected)

      // DONE
      .addCase(updateDocumentDone.pending, (state, action) => {
        state.error = null;
        state.updatingId = action.meta.arg.id;
      })
      .addCase(updateDocumentDone.fulfilled, (state, action) => {
        const doc = action.payload;
        const country = doc.country;
        state.items[country] = state.items[country].map((done) =>
          done._id === doc._id ? doc : done,
        );
        state.updatingId = null;
      })
      .addCase(updateDocumentDone.rejected, (state, action) => {
        state.error = action.payload ?? "Error updating status";
        state.updatingId = null;
      })

      // UPDATE (EDIT)
      .addCase(updateDocument.pending, setActionPending)
      .addCase(updateDocument.fulfilled, (state, action) => {
        const doc = action.payload;
        const country = doc.country;
        state.items[country] = state.items[country].map((document) =>
          document._id === doc._id ? doc : document,
        );
        state.isActionLoading = false;
      })
      .addCase(updateDocument.rejected, setActionRejected)

      // DELETE
      .addCase(deleteDocument.pending, setActionPending)
      .addCase(deleteDocument.fulfilled, (state, action) => {
        const { id, country } = action.payload;
        state.items[country] = state.items[country].filter(
          (document) => document._id !== id,
        );
        state.isActionLoading = false;
      })
      .addCase(deleteDocument.rejected, setActionRejected);
  },
});

export const { clearDocuments, clearDocsError } = documentsSlice.actions;

export const documentsReducer = documentsSlice.reducer;
