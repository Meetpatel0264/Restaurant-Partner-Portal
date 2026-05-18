import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../api/api";

export const registerUser =
  createAsyncThunk(
    "auth/register",
    async (
      formData,
      thunkAPI
    ) => {

      try {

        const res =
          await api.post(
            "/auth/register",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        return res.data.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

export const loginUser =
  createAsyncThunk(
    "auth/login",
    async (
      userData,
      thunkAPI
    ) => {

      try {

        const res =
          await api.post(
            "/auth/login",
            userData
          );

        return res.data.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

export const getProfile =
  createAsyncThunk(
    "auth/profile",
    async (_, thunkAPI) => {

      try {

        const res =
          await api.get(
            "/auth/me"
          );

        return res.data.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    loading: false,
    error: null,
  },

  reducers: {

    logout: (state) => {

      state.user = null;

      state.error = null;
    },

  },

  extraReducers: (builder) => {

    builder

      .addCase(
        registerUser.pending,
        (state) => {

          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        registerUser.fulfilled,
        (state, action) => {

          state.loading = false;

          state.user =
            action.payload;
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      )

      .addCase(
        loginUser.pending,
        (state) => {

          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        loginUser.fulfilled,
        (state, action) => {

          state.loading = false;

          state.user =
            action.payload;
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      )

      .addCase(
        getProfile.pending,
        (state) => {

          state.loading = true;
        }
      )

      .addCase(
        getProfile.fulfilled,
        (state, action) => {

          state.loading = false;

          state.user =
            action.payload;
        }
      )

      .addCase(
        getProfile.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      );
  },
});

export const { logout } =
  authSlice.actions;

export default authSlice.reducer;