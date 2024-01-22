/* Creating a store for the redux state. */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

//persist help not logout user when reload
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

import authReducer from "./authSlice";
import roomSlice from "./roomSlice";
import messageSlice from "./messageSlice";
import userReducer from "./userSlice";
import postSlice from "./postSlice";
import commentSlice from "./commentSlice";
import notificationSlice from "./notificationSlice";
import otpSlice from "./otpSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  room: roomSlice,
  message: messageSlice,
  user: userReducer,
  post: postSlice,
  comment: commentSlice,
  notification: notificationSlice,
  otp: otpSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
