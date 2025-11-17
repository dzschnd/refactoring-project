import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseServiceError } from "../../utils/parseServiceError";
import { axiosAuthorized, baseURL } from "./config";

const BASE_URL: string = `${baseURL}/upload`;

export const uploadImage = createAsyncThunk(
  "draft/upload",
  async (
    payload: { file: File; id: number; type: "coupleImage" | "placeImage" },
    { rejectWithValue },
  ) => {
    const formData = new FormData();
    formData.append("image", payload.file);
    formData.append("type", payload.type);
    try {
      const response = await axiosAuthorized.post(
        `${BASE_URL}/${payload.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

export const resetImage = createAsyncThunk(
  "draft/upload/reset",
  async (
    payload: { id: number; type: "coupleImage" | "placeImage" },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosAuthorized.post(
        `${BASE_URL}/reset/${payload.id}`,
        { type: payload.type },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);
