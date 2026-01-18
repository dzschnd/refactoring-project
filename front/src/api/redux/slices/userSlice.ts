import { createSlice } from "@reduxjs/toolkit";
import {
  activateUser,
  changeEmail,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  requestEmailChange,
  requestOtp,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
} from "../../service/UserService";

interface StateError {
  message: string;
  status: number;
}

interface UserState {
  email: string | null;
  verified: boolean;
  loading: boolean;
  error: StateError | null;
}

const initialState: UserState = {
  email: null,
  verified: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.loading = false;
        state.error = null;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(activateUser.fulfilled, (state) => {
        state.verified = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(activateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.email = action.payload.email;
        state.error = null;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(changeEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.email = action.payload.newEmail ?? state.email;
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(changeEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(requestEmailChange.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(requestEmailChange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(requestEmailChange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(requestOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(requestOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.verified = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.email = action.payload.email;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.email = null;
        state.verified = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.email = null;
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { setEmail } = userSlice.actions;

export const userReducer = userSlice.reducer;
