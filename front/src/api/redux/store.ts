import { configureStore } from "@reduxjs/toolkit";
import type { PersistConfig } from "redux-persist";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { draftReducer } from "./slices/draftSlice";
import type { DraftState } from "../../types";
import type { UserState } from "./slices/userSlice";
import { userReducer } from "./slices/userSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";

const userPersistConfig: PersistConfig<UserState> = {
  key: "user",
  storage,
};

const draftPersistConfig: PersistConfig<DraftState> = {
  key: "draft",
  storage,
};

export const store = configureStore({
  reducer: {
    user: persistReducer<UserState>(userPersistConfig, userReducer),
    draft: persistReducer<DraftState>(draftPersistConfig, draftReducer),
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
