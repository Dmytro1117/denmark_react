// 1. Libraries
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// 2. Redux-Slise
import { authReduсer } from "./auth/authSlise";
import { documentsReducer } from "./documents/documentsSlise";
import { galleryReducer } from "./gallery/gallerySlise";
import { mapReducer } from "./map/mapSlice";
import { studyReducer } from "./study/studySlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReduсer),
    documents: documentsReducer,
    gallery: galleryReducer,
    map: mapReducer,
    study: studyReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
