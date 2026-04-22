import { createAsyncThunk } from "@reduxjs/toolkit";
import denmarkAPI from "../../helpers/axiosConfig";

// GET /api/map?mapType=ua|dk
export const fetchHotspots = createAsyncThunk(
  "hotspots/fetchHotspots",
  async ({ mapType }, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.get("/map", {
        params: { mapType },
      });

      return { mapType, hotspots: data.hotspots };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// GET /api/map/:id
export const fetchHotspotById = createAsyncThunk(
  "hotspots/fetchHotspotById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.get(`/map/${id}`);

      if (!data.hotspot) {
        return rejectWithValue("Invalid server response: hotspot is missing");
      }

      return data.hotspot;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// POST /api/map
export const addHotspot = createAsyncThunk(
  "hotspots/addHotspot",
  async (
    { mapType, name, category, position, imageUrl = "", description },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await denmarkAPI.post("/map", {
        mapType,
        name,
        category,
        position,
        imageUrl,
        description,
      });

      if (!data.hotspot) {
        return rejectWithValue("Invalid server response: hotspot is missing");
      }

      return data.hotspot;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

//  PATCH  /api/map/:id
export const updateHotspot = createAsyncThunk(
  "hotspots/updateHotspot",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.patch(`/map/${id}`, payload);

      if (!data.hotspot) {
        return rejectWithValue("Invalid server response: hotspot is missing");
      }

      return data.hotspot;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// DELETE /api/map/:id
export const deleteHotspot = createAsyncThunk(
  "hotspots/deleteHotspot",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.delete(`/map/${id}`);

      if (!data.hotspot) {
        return rejectWithValue("Invalid server response: hotspot is missing");
      }

      return { id: data.hotspot._id, mapType: data.hotspot.mapType };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);
