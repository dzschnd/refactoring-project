import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseServiceError } from "../../utils/parseServiceError";
import { UpdateDraftPayload } from "../../types";
import { axiosAuthorized, baseURL } from "./config";

const BASE_URL = `${baseURL}/drafts`;

// router.put('/:id/publish',
//   verifyAccessToken, verifyUser,
//   fetchDraft,
//   publishValidation, handleValidationErrors,
//   DraftController.publishDraft);
export const publishDraft = createAsyncThunk(
  "draft/publish",
  async (payload: { id: number }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthorized.put(
        `${BASE_URL}/${payload.id}/publish`,
        {},
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

export const validateDraft = async (payload: { id: number }) => {
  try {
    const response = await axiosAuthorized.put(
      `${BASE_URL}/${payload.id}/validate`,
      {},
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    return parseServiceError(error);
  }
};

// router.post('/',
//   verifyAccessToken, verifyUser,
//   updateValidation, handleValidationErrors,
//   DraftController.createDraft);
export const createDraft = createAsyncThunk(
  "draft/create",
  async (payload: { templateName: string }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthorized.post(
        `${BASE_URL}`,
        { templateName: payload.templateName },
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// router.patch('/:id',
//   verifyAccessToken, verifyUser,
//   updateValidation, handleValidationErrors,
//   DraftController.updateDraft);
export const updateDraft = createAsyncThunk(
  "draft/update",
  async (payload: UpdateDraftPayload, { rejectWithValue }) => {
    try {
      const updateFields: any = {};

      if (payload.firstPartnerName !== undefined)
        updateFields.firstPartnerName = payload.firstPartnerName;
      if (payload.secondPartnerName !== undefined)
        updateFields.secondPartnerName = payload.secondPartnerName;
      if (payload.coupleImage !== undefined)
        updateFields.coupleImage = payload.coupleImage;
      if (payload.eventDate !== undefined)
        updateFields.eventDate = payload.eventDate;
      if (payload.templateName !== undefined)
        updateFields.templateName = payload.templateName;
      if (payload.colors !== undefined) updateFields.colors = payload.colors;
      if (payload.place !== undefined) updateFields.place = payload.place;
      if (payload.planItems !== undefined)
        updateFields.planItems = payload.planItems;
      if (payload.wishes !== undefined) updateFields.wishes = payload.wishes;
      if (payload.questions !== undefined)
        updateFields.questions = payload.questions;
      if (payload.answers !== undefined) updateFields.answers = payload.answers;

      const response = await axiosAuthorized.patch(
        `${BASE_URL}/${payload.id}`,
        updateFields,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// router.get('/:id',
//   verifyAccessToken, verifyUser,
//   DraftController.getDraft);
export const getDraft = createAsyncThunk(
  "draft/get",
  async (payload: { id: number }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthorized.get(`${BASE_URL}/${payload.id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(parseServiceError(error));
    }
  },
);

// router.get('/',
//   verifyAccessToken, verifyUser,
//   DraftController.getAllDrafts);
export const getAllDrafts = async () => {
  try {
    const response = await axiosAuthorized.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return parseServiceError(error);
  }
};

// router.delete('/:id',
//   verifyAccessToken, verifyUser,
//   DraftController.deleteDraft);
export const deleteDraft = async (id: number) => {
  try {
    const response = await axiosAuthorized.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return parseServiceError(error);
  }
};
