import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../api/api";

export const getOrders =
  createAsyncThunk(
    "orders/getOrders",
    async (_, thunkAPI) => {

      try {

        const res =
          await api.get(
            "/orders"
          );

        return res.data.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

export const updateOrderStatus =
  createAsyncThunk(
    "orders/updateStatus",
    async (
      { id, status },
      thunkAPI
    ) => {

      try {

        const res =
          await api.put(
            `/orders/${id}/status`,
            { status }
          );

        return res.data.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

const orderSlice = createSlice({
  name: "orders",

  initialState: {
    orders: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        getOrders.pending,
        (state) => {

          state.loading = true;
        }
      )

      .addCase(
        getOrders.fulfilled,
        (state, action) => {

          state.loading = false;

          state.orders =
            action.payload;
        }
      )

      .addCase(
        getOrders.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      )

      .addCase(
        updateOrderStatus.fulfilled,
        (state, action) => {

          const index =
            state.orders.findIndex(
              (order) =>
                order._id ===
                action.payload._id
            );

          if (index !== -1) {

            state.orders[index] =
              action.payload;
          }
        }
      );
  },
});

export default orderSlice.reducer;