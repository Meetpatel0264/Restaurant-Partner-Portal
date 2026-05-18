import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../api/api";

// GET FOODS
export const getFoods =
  createAsyncThunk(
    "foods/getFoods",
    async (_, thunkAPI) => {

      try {

        const res =
          await api.get(
            "/foods"
          );

        return res.data.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

// ADD FOOD
export const addFood =
  createAsyncThunk(
    "foods/addFood",
    async (
      formData,
      thunkAPI
    ) => {

      try {

        const res =
          await api.post(
            "/foods",
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

// UPDATE FOOD
export const updateFood =
  createAsyncThunk(
    "foods/updateFood",
    async (
      { id, formData },
      thunkAPI
    ) => {

      try {

        const res =
          await api.put(
            `/foods/${id}`,
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

// DELETE FOOD
export const deleteFood =
  createAsyncThunk(
    "foods/deleteFood",
    async (id, thunkAPI) => {

      try {

        await api.delete(
          `/foods/${id}`
        );

        return id;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

const foodSlice = createSlice({
  name: "foods",

  initialState: {
    foods: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // GET FOODS
      .addCase(
        getFoods.pending,
        (state) => {

          state.loading = true;
        }
      )

      .addCase(
        getFoods.fulfilled,
        (state, action) => {

          state.loading = false;

          state.foods =
            action.payload;
        }
      )

      .addCase(
        getFoods.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      )

      // ADD FOOD
      .addCase(
        addFood.pending,
        (state) => {

          state.loading = true;
        }
      )

      .addCase(
        addFood.fulfilled,
        (state, action) => {

          state.loading = false;

          state.foods.unshift(
            action.payload
          );
        }
      )

      .addCase(
        addFood.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      )

      // UPDATE FOOD
      .addCase(
        updateFood.fulfilled,
        (state, action) => {

          const index =
            state.foods.findIndex(
              (food) =>
                food._id ===
                action.payload._id
            );

          if (index !== -1) {

            state.foods[index] =
              action.payload;
          }
        }
      )

      // DELETE FOOD
      .addCase(
        deleteFood.fulfilled,
        (state, action) => {

          state.foods =
            state.foods.filter(
              (food) =>
                food._id !==
                action.payload
            );
        }
      );
  },
});

export default foodSlice.reducer;