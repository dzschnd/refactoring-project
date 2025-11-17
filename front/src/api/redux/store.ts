import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { draftReducer } from "./slices/draftSlice";
import { userReducer } from './slices/userSlice'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";

const userPersistConfig = {
  key: 'user',
  storage, 
};

const draftPersistConfig = {
  key: 'draft',
  storage, 
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, userReducer),
    draft: persistReducer(draftPersistConfig, draftReducer),
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