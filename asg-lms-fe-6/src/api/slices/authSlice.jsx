import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/Auth";
import ErrorMessage from "../../utils/ErrorMessage";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user,
  isLoading: false,
  isSuccess: false,
  isAuthenticated: false,
  isError: false,
  message: "",
};

// Register user
export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    return await AuthService.register(userData);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return ErrorMessage(message);
  }
});

// login
export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    return await AuthService.login(userData);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return ErrorMessage(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await AuthService.logout();
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return ErrorMessage(message);
  }
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  try {
    const response = await AuthService.refreshToken();
    console.log("TOKEN REFRESHED!");
    return response;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return ErrorMessage(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //Register cases
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        console.log(action);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      // Login cases
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
        state.message = action.payload;
        state.user = null;
      })
      // Logout cases
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = true;
      })
      //refreshtoken case
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
