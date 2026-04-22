import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAvailableTopics,
  fetchWords,
  sendAnswer,
} from "./operationsStudy";

const initialState = {
  ui: {
    level: "",
    topic: "",
    mode: "topic", // "topic" | "repeat"
  },

  availableTopics: {
    repeat: { wordsInRepeat: 0 },
    topics: [],
    learnedWords: 0,
  },

  words: [],
  wordIndex: 0,

  session: { correct: 0, total: 0, isFinished: false },

  isAvailableTopicsLoading: false,
  isWordsLoading: false,
  isAnswerLoading: false,

  error: null,
  availableError: null,
};

const studySlice = createSlice({
  name: "study",
  initialState,

  reducers: {
    setLevel: (state, action) => {
      state.ui.level = action.payload || "";
      state.ui.topic = "";
      state.ui.mode = "topic";
      state.words = [];
      state.wordIndex = 0;
      state.session = { correct: 0, total: 0, isFinished: false };
      state.error = null;
      state.availableError = null;
    },

    openTopic: (state, action) => {
      state.ui.topic = action.payload || "";
      state.ui.mode = "topic";
      state.words = [];
      state.wordIndex = 0;
      state.session = { correct: 0, total: 0, isFinished: false };
      state.error = null;
    },

    openRepeat: (state) => {
      state.ui.topic = "";
      state.ui.mode = "repeat";
      state.words = [];
      state.wordIndex = 0;
      state.session = { correct: 0, total: 0, isFinished: false };
      state.error = null;
    },

    nextWord: (state) => {
      state.wordIndex += 1;

      if (state.wordIndex >= state.words.length) {
        state.session.isFinished = true;
      }
    },

    sessionResult: (state, action) => {
      const result = action.payload; // "known" | "unknown"
      state.session.total += 1;
      if (result === "known") state.session.correct += 1;
    },

    resetSession: (state) => {
      state.words = [];
      state.wordIndex = 0;
      state.session = { correct: 0, total: 0, isFinished: false };
      state.error = null;
    },
    clearStudyError: (state) => {
      state.error = null;
      state.availableError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // AVAILABLE
      .addCase(fetchAvailableTopics.pending, (state) => {
        state.isAvailableTopicsLoading = true;
        state.availableError = null;
      })
      .addCase(fetchAvailableTopics.fulfilled, (state, action) => {
        state.isAvailableTopicsLoading = false;

        if (action.payload) {
          state.availableTopics = action.payload;
        } else {
          state.availableTopics = {
            repeat: { wordsInRepeat: 0 },
            topics: [],
            learnedWords: 0,
          };
        }

        state.availableError = null;
      })
      .addCase(fetchAvailableTopics.rejected, (state, action) => {
        state.isAvailableTopicsLoading = false;
        state.availableError =
          action.payload ?? action.error?.message ?? "Unknown error";
      })

      // WORDS
      .addCase(fetchWords.pending, (state) => {
        state.isWordsLoading = true;
        state.error = null;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.isWordsLoading = false;

        state.words = action.payload || [];
        state.wordIndex = 0;

        state.session.correct = 0;
        state.session.total = 0;
        state.session.isFinished = state.words.length === 0;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.isWordsLoading = false;
        state.error =
          action.payload ?? action.error?.message ?? "Unknown error";

        state.words = [];
        state.wordIndex = 0;
        state.session = { correct: 0, total: 0, isFinished: true };
      })

      // ANSWER
      .addCase(sendAnswer.pending, (state) => {
        state.isAnswerLoading = true;
        state.error = null;
      })
      .addCase(sendAnswer.fulfilled, (state) => {
        state.isAnswerLoading = false;
      })
      .addCase(sendAnswer.rejected, (state, action) => {
        state.isAnswerLoading = false;
        state.error =
          action.payload ?? action.error?.message ?? "Unknown error";
      });
  },
});

export const {
  setLevel,
  openTopic,
  openRepeat,
  nextWord,
  sessionResult,
  resetSession,
  clearStudyError,
} = studySlice.actions;

export const studyReducer = studySlice.reducer;
