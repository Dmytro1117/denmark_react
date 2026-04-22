import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuth } from "./authSlise";
import denmarkAPI, {
  setAuthHeader,
  cleanAuthHeader,
} from "../../helpers/axiosConfig";

// 1. REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("password", userData.password);

      if (userData.avatar) {
        formData.append("avatar", userData.avatar);
      }

      const response = await denmarkAPI.post("/auth/register", formData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// 2. VERIFICATION
export const verificationUser = createAsyncThunk(
  "auth/verificationUser",
  async (verificationToken, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.get(
        `/auth/verify/${verificationToken}`,
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
  {
    // ЗАХИСТ: якщо вже верифікуємо цей токен, не робити запит знову
    condition: (verificationToken, { getState }) => {
      const { auth } = getState();
      if (auth.lastVerifyToken === verificationToken) {
        return false; // Скасовує виклик санка
      }
    },
  },
);

// 3. RESEND VERIFICATION
export const resendVerification = createAsyncThunk(
  "auth/resendVerification",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.post("/auth/verify/resend-email", {
        email,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// 4. LOGIN
export const loginization = createAsyncThunk(
  "auth/loginization",
  async (user, { rejectWithValue }) => {
    try {
      const response = await denmarkAPI.post("/auth/login", user);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// 5. LOGOUT
export const logOut = createAsyncThunk(
  "auth/logout",
  async (user, { rejectWithValue }) => {
    try {
      await denmarkAPI.post("/auth/logout", user);
      cleanAuthHeader();
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// 6. REFRESH USER
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (!token) return thunkAPI.rejectWithValue(null);

    try {
      setAuthHeader(token);
      const response = await denmarkAPI.get("/auth/current");
      return response.data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        cleanAuthHeader();
        thunkAPI.dispatch(clearAuth());
      }

      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  },
);

// 7. FOGOT PASSWORD
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.post("/auth/password/forgot", {
        email,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// 8. RESET PASSWORD
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ resetToken, password, passwordConfirm }, { rejectWithValue }) => {
    try {
      const { data } = await denmarkAPI.post(
        `/auth/password/reset/${resetToken}`,
        { password, passwordConfirm },
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// 9. UPDATE AVATAR
export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const { data } = await denmarkAPI.patch("/user/avatars", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.avatar;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  },
);

// 10. CHANGE PASSWORD
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ oldPassword, newPassword, newPasswordConfirm }, thunkAPI) => {
    try {
      const { data } = await denmarkAPI.patch("/user/changePassword", {
        oldPassword,
        newPassword,
        newPasswordConfirm,
      });
      cleanAuthHeader();
      thunkAPI.dispatch(clearAuth());
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  },
);

// 11. DELETE ACCOUNT
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, thunkAPI) => {
    try {
      await denmarkAPI.delete("/user/deleteAccount");

      cleanAuthHeader();

      return true;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  },
);
