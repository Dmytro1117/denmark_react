import { createAsyncThunk } from "@reduxjs/toolkit";
import denmarkAPI from "../../helpers/axiosConfig";

// GET /api/study/available?level=A2
export const fetchAvailableTopics = createAsyncThunk(
  "study/fetchAvailableTopics",
  async ({ level } = {}, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.get("/study/topics", {
        params: { level },
      });

      return data.availableTopics;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message || "Network Error" });
    }
  },
);

// GET /api/study/words?mode=topic|repeat&level=A2&topicName=general
export const fetchWords = createAsyncThunk(
  "study/fetchWords",

  async ({ mode = "topic", level, topicName } = {}, { rejectWithValue }) => {
    if (!level) return rejectWithValue("Level is required");

    try {
      const { data } = await denmarkAPI.get("/study/words", {
        params: { mode, level, ...(topicName && { topicName }) },
      });

      return Array.isArray(data.words) ? data.words : [];
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message || "Network Error" });
    }
  },
);

// POST /api/study/:wordId/answer
export const sendAnswer = createAsyncThunk(
  "study/sendAnswer",
  async ({ wordId, result, mode }, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.post(`/study/${wordId}/answer`, {
        result,
        mode,
      });

      return data.progress;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message || "Network Error" });
    }
  },
);
