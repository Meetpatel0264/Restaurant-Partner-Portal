import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

import authReducer from "../features/authSlice";

import foodReducer from "../features/foodSlice";

import orderReducer from "../features/orderSlice";

const storage = {
  getItem: (key) => {
    return Promise.resolve(
      localStorage.getItem(key)
    );
  },

  setItem: (key, value) => {
    localStorage.setItem(key, value);

    return Promise.resolve();
  },

  removeItem: (key) => {
    localStorage.removeItem(key);

    return Promise.resolve();
  },
};

const rootReducer =
  combineReducers({
    auth: authReducer,
    foods: foodReducer,
    orders: orderReducer,
  });

const persistConfig = {
  key: "root",
  storage,

  whitelist: ["auth"],
};

const persistedReducer =
  persistReducer(
    persistConfig,
    rootReducer
  );

export const store =
  configureStore({
    reducer: persistedReducer,

    middleware: (
      getDefaultMiddleware
    ) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export const persistor =
  persistStore(store);