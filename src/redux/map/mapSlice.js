import { createSlice } from "@reduxjs/toolkit";
import {
  fetchHotspots,
  addHotspot,
  updateHotspot,
  deleteHotspot,
  fetchHotspotById,
} from "./operationMap";

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
  isDetailsHotspotLoading: false,
  isActionLoading: false,
  error: null,
  deletingId: null,
};

const mapSlice = createSlice({
  name: "hotspots",
  initialState,
  reducers: {
    clearHotspots: (state) => {
      state.items.ua = [];
      state.items.dk = [];
      state.isLoading = false;
      state.isActionLoading = false;
      state.error = null;
      state.deletingId = null;
    },
    clearHotspotError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchHotspots.pending, setPending)
      .addCase(fetchHotspots.fulfilled, (state, action) => {
        state.isLoading = false;
        const { mapType, hotspots } = action.payload;
        state.items[mapType] = hotspots;
      })
      .addCase(fetchHotspots.rejected, setRejected)

      // FETCH BY ID
      .addCase(fetchHotspotById.pending, (state) => {
        state.isDetailsHotspotLoading = true;
        state.error = null;
      })
      .addCase(fetchHotspotById.fulfilled, (state) => {
        state.isDetailsHotspotLoading = false;
      })
      .addCase(fetchHotspotById.rejected, (state, action) => {
        state.isDetailsHotspotLoading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addHotspot.pending, setActionPending)
      .addCase(addHotspot.fulfilled, (state, action) => {
        const hotspot = action.payload;
        state.items[hotspot.mapType] = [
          hotspot,
          ...state.items[hotspot.mapType],
        ];
        state.isActionLoading = false;
      })
      .addCase(addHotspot.rejected, setActionRejected)

      // UPDATE
      .addCase(updateHotspot.pending, setActionPending)
      .addCase(updateHotspot.fulfilled, (state, action) => {
        const hotspot = action.payload;
        const mapType = hotspot.mapType;

        state.items[mapType] = state.items[mapType].map((obj) =>
          obj._id === hotspot._id ? hotspot : obj,
        );
        state.isActionLoading = false;
      })
      .addCase(updateHotspot.rejected, setActionRejected)

      // DELETE
      .addCase(deleteHotspot.pending, (state, action) => {
        state.isActionLoading = true;
        state.error = null;
        state.deletingId = action.meta.arg.id;
      })
      .addCase(deleteHotspot.fulfilled, (state, action) => {
        const { id, mapType } = action.payload;
        state.items[mapType] = state.items[mapType].filter(
          (obj) => obj._id !== id,
        );
        state.isActionLoading = false;
        state.deletingId = null;
      })
      .addCase(deleteHotspot.rejected, (state, action) => {
        state.isActionLoading = false;
        state.error =
          action.payload ?? action.error?.message ?? "Unknown error";
        state.deletingId = null;
      });
  },
});

export const { clearHotspots, clearHotspotError } = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
