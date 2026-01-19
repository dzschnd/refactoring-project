import { api } from "./config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseServiceError } from "../../utils/parseServiceError";
import { axiosAuthorized } from "./config";
import type {
  RegisterRequest,
  RequestOtpRequest,
  LoginRequest,
  VerifyEmailRequest,
  RequestResetPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  RequestChangeEmailRequest,
  ChangeEmailRequest,
  ChangeNameRequest,
} from "../../shared/types";
import {
  messageResponseSchema,
  userResponseSchema,
  requestPasswordResetResponseSchema,
  changeEmailResponseSchema,
  changeNameResponseSchema,
} from "../../shared/schemas/responses";

const BASE_URL = "auth";

// register: send email + password -> create new user, get otp sent to email
export const registerUser = createAsyncThunk(
  `user/register`,
  async (payload: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/register`,
        {
          email: payload.email,
          password: payload.password,
        },
        { suppressErrorToast: true },
      );
      return userResponseSchema.parse(response.data);
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// request otp: send email -> get otp sent to email
export const requestOtp = createAsyncThunk(
  `user/requestOtp`,
  async (payload: RequestOtpRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/requestOtp`,
        {
          email: payload.email,
        },
        { suppressErrorToast: true },
      );
      return messageResponseSchema.parse(response.data);
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// login: send email + password -> get new refresh-access pair
export const loginUser = createAsyncThunk(
  `user/login`,
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/login`,
        {
          email: payload.email,
          password: payload.password,
        },
        {
          withCredentials: true,
          suppressErrorToast: true,
        },
      );
      return userResponseSchema.parse(response.data);
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// profile: send access token -> get email + id
export const getUser = createAsyncThunk(
  `user/me`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthorized.get(`${BASE_URL}/me`, {
        suppressErrorToastOn403: true,
      });
      return userResponseSchema.parse(response.data);
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
      return messageResponseSchema.parse(response.data);
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// verify email: send email, otp -> check email
export const verifyEmail = createAsyncThunk(
  `user/verify-email`,
  async (payload: VerifyEmailRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/verify-email`,
        {
          email: payload.email,
          otp: payload.otp,
        },
        { suppressErrorToast: true },
      );
      return messageResponseSchema.parse(response.data);
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// activate user: send email, otp -> get user activated
export const activateUser = createAsyncThunk(
  `user/activate`,
  async (payload: VerifyEmailRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/activate`,
        {
          email: payload.email,
          otp: payload.otp,
        },
        {
          withCredentials: true,
          suppressErrorToast: true,
        },
      );
      return messageResponseSchema.parse(response.data);
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// request reset password: send email -> get otp sent to email
export const requestPasswordReset = createAsyncThunk(
  "user/requestPasswordReset",
  async (payload: RequestResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/password/reset`,
        {
          email: payload.email,
        },
        { suppressErrorToast: true },
      );
      return requestPasswordResetResponseSchema.parse(response.data);
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// reset password: send otp + new password -> change password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (payload: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${BASE_URL}/password/reset`,
        {
          email: payload.email,
          password: payload.password,
        },
        { suppressErrorToast: true },
      );
      return messageResponseSchema.parse(response.data);
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// change password (logged in): send access token + new password -> change password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (payload: ChangePasswordRequest, { rejectWithValue }) => {
    try {
      const response = await axiosAuthorized.patch(
        `${BASE_URL}/me/password`,
        {
          oldPassword: payload.oldPassword,
          newPassword: payload.newPassword,
        },
        { suppressErrorToast: true },
      );
      return messageResponseSchema.parse(response.data);
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// request change email: send new email -> get otp sent to email
export const requestEmailChange = createAsyncThunk(
  "user/requestEmailChange",
  async (payload: RequestChangeEmailRequest, { rejectWithValue }) => {
    try {
      const response = await axiosAuthorized.post(
        `${BASE_URL}/me/email/change-request`,
        { currentEmail: payload.currentEmail, newEmail: payload.newEmail },
        { suppressErrorToast: true },
      );
      return messageResponseSchema.parse(response.data);
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// change email: send access token + otp + new email -> change email
export const changeEmail = createAsyncThunk(
  "user/changeEmail",
  async (payload: ChangeEmailRequest, { rejectWithValue }) => {
    try {
      const response = await axiosAuthorized.patch(
        `${BASE_URL}/me/email`,
        {
          otp: payload.otp,
          newEmail: payload.newEmail,
        },
        { suppressErrorToast: true },
      );
      return changeEmailResponseSchema.parse(response.data);
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

export const changeName = createAsyncThunk(
  "user/changeName",
  async (payload: ChangeNameRequest, { rejectWithValue }) => {
    try {
      const response = await axiosAuthorized.patch(
        `${BASE_URL}/me/name`,
        {
          newName: payload.newName,
        },
        { suppressErrorToast: true },
      );
      return changeNameResponseSchema.parse(response.data);
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);
