import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ServiceError } from "../../errors";

export interface UiState {
  pendingRequests: number;
  lastError: ServiceError | null;
}

const initialState: UiState = {
  pendingRequests: 0,
  lastError: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    requestStarted: (state) => {
      state.pendingRequests += 1;
    },
    requestFinished: (state) => {
      state.pendingRequests = Math.max(0, state.pendingRequests - 1);
    },
    setError: (state, action: PayloadAction<ServiceError>) => {
      state.lastError = action.payload;
    },
    clearError: (state) => {
      state.lastError = null;
    },
  },
});

export const { requestStarted, requestFinished, setError, clearError } =
  uiSlice.actions;

export const uiReducer = uiSlice.reducer;
