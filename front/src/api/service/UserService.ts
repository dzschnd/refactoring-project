import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseServiceError } from "../../utils/parseServiceError";
import { axiosAuthorized, baseURL } from "./config";

const BASE_URL = `${baseURL}/auth`;

// register: send email + password -> create new user, get otp sent to email
export const registerUser = createAsyncThunk(
  `user/register`,
  async (
    payload: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        email: payload.email,
        password: payload.password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// request otp: send email -> get otp sent to email
export const requestOtp = createAsyncThunk(
  `user/requestOtp`,
  async (payload: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/requestOtp`, {
        email: payload.email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// login: send email + password -> get new refresh-access pair
export const loginUser = createAsyncThunk(
  `user/login`,
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          email: payload.email,
          password: payload.password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// refresh tokens: send refresh token -> get new refresh-access pair
axiosAuthorized.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(`${BASE_URL}/refresh`, {}, { withCredentials: true });

        return axiosAuthorized(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// profile: send access token -> get email + id
export const getUser = createAsyncThunk(
  `user/me`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthorized.get(`${BASE_URL}/me`);
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// logout: send access token -> invalidate refresh token
export const logoutUser = createAsyncThunk(
  `user/logout`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthorized.patch(`${BASE_URL}/logout`, {});
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// verify email: send email, otp -> check email
export const verifyEmail = createAsyncThunk(
  `user/verify-email`,
  async (payload: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify-email`, {
        email: payload.email,
        otp: payload.otp,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// activate user: send email, otp -> get user activated
export const activateUser = createAsyncThunk(
  `user/activate`,
  async (payload: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/activate`,
        {
          email: payload.email,
          otp: payload.otp,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// request reset password: send email -> get otp sent to email
export const requestPasswordReset = createAsyncThunk(
  "user/requestPasswordReset",
  async (payload: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/password/reset`, {
        email: payload.email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// reset password: send otp + new password -> change password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/password/reset`, {
        email: payload.email,
        password: payload.password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// change password (logged in): send access token + new password -> change password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (
    payload: { oldPassword: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosAuthorized.patch(`${BASE_URL}/me/password`, {
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// request change email: send new email -> get otp sent to email
export const requestEmailChange = createAsyncThunk(
  "user/requestEmailChange",
  async (
    payload: { currentEmail: string; newEmail: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosAuthorized.post(
        `${BASE_URL}/me/email/change-request`,
        { currentEmail: payload.currentEmail, newEmail: payload.newEmail },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// change email: send access token + otp + new email -> change email
export const changeEmail = createAsyncThunk(
  "user/changeEmail",
  async (payload: { otp: string; newEmail: string }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthorized.patch(`${BASE_URL}/me/email`, {
        otp: payload.otp,
        newEmail: payload.newEmail,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

export const changeName = createAsyncThunk(
  "user/changeName",
  async (payload: { newName: string }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthorized.patch(`${BASE_URL}/me/name`, {
        newName: payload.newName,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);
