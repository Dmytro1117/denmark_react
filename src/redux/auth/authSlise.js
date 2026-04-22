import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAccount,
  register,
  loginization,
  logOut,
  refreshUser,
  updateAvatar,
  verificationUser,
  resendVerification,
  forgotPassword,
  resetPassword,
  changePassword,
} from "./operationsAuth";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload ?? action.error?.message ?? "Unknown error";
};

const initialState = {
  user: { email: null, name: null, avatar: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
  isLoading: false,
  lastVerifyToken: null,
};

const authSlise = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearAuth: (state) => {
      state.user = { email: null, name: null, avatar: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
      state.error = null;
      state.isLoading = false;
      state.lastVerifyToken = null;
    },
    skipRefresh: (state) => {
      state.isRefreshing = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(register.rejected, handleRejected)

      // LOGIN
      .addCase(loginization.pending, handlePending)
      .addCase(loginization.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginization.rejected, handleRejected)

      // REFRESH
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isLoggedIn = true;
        } else {
          state.user = { email: null, name: null, avatar: null };
          state.isLoggedIn = false;
        }
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload ?? action.error?.message ?? null;
      })

      // VERIFY EMAIL
      .addCase(verificationUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.lastVerifyToken = action.meta.arg;
      })
      .addCase(verificationUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(verificationUser.rejected, handleRejected)

      // RESEND VERIFY
      .addCase(resendVerification.pending, handlePending)
      .addCase(resendVerification.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resendVerification.rejected, handleRejected)

      // UPDATE AVATAR
      .addCase(updateAvatar.pending, handlePending)
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user.avatar = action.payload;
      })
      .addCase(updateAvatar.rejected, handleRejected)

      // LOGOUT
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.user = { email: null, name: null, avatar: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = null;
        state.isLoading = false;
        state.lastVerifyToken = null;
      })
      .addCase(logOut.rejected, handleRejected)

      // FOGOT PASSWORD
      .addCase(forgotPassword.pending, handlePending)
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, handleRejected)

      // RESET PASSWORD
      .addCase(resetPassword.pending, handlePending)
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, handleRejected)

      // CHANGE PASSWORD
      .addCase(changePassword.pending, handlePending)
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, handleRejected)

      // DELETING ACCOUNT
      .addCase(deleteAccount.pending, handlePending)
      .addCase(deleteAccount.fulfilled, (state) => {
        state.user = { email: null, name: null, avatar: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteAccount.rejected, handleRejected);
  },
});

export const { clearAuth, skipRefresh, clearAuthError } = authSlise.actions;

export const authReduсer = authSlise.reducer;
