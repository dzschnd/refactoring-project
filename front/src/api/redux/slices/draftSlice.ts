import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { resetPassword } from "../../service/UserService";
import {
  createDraft,
  getDraft,
  publishDraft,
  updateDraft,
} from "../../service/DraftService";
import type { DraftState, StateError } from "../../../types";
import { resetImage, uploadImage } from "../../service/UploadService";

const initialState: DraftState = {
  loading: false,
  error: null,
  id: -1,
  firstPartnerName: null,
  secondPartnerName: null,
  coupleImage: null,
  eventDate: null,
  place: {
    address: null,
    placeImage: null,
    link: null,
  },
  templateName: null,
  colors: null,
  prevColors: null,
  planItems: null,
  wishes: null,
  prevWishes: null,
  questions: null,
  answers: null,
  lastViewedConstructorBlock: "names",
};

export const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    setLastViewedConstructorBlock: (
      state,
      action: PayloadAction<DraftState["lastViewedConstructorBlock"]>,
    ) => {
      state.lastViewedConstructorBlock = action.payload;
    },
    updateLocalDraft: (state, action: PayloadAction<Partial<DraftState>>) => {
      const next = action.payload;
      return {
        ...state,
        ...next,
        wishes: next.wishes
          ? next.wishes.map((wish) => ({ ...wish }))
          : state.wishes,
        prevWishes: next.prevWishes
          ? next.prevWishes.map((wish) => ({ ...wish }))
          : state.prevWishes,
        colors: next.colors
          ? next.colors.map((color) => ({ ...color }))
          : state.colors,
        prevColors: next.prevColors
          ? next.prevColors.map((color) => ({ ...color }))
          : state.prevColors,
        planItems: next.planItems
          ? next.planItems.map((item) => ({ ...item }))
          : state.planItems,
        questions: next.questions
          ? next.questions.map((question) => ({ ...question }))
          : state.questions,
        answers: next.answers
          ? next.answers.map((answer) => ({ ...answer }))
          : state.answers,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDraft.fulfilled, (state, action) => {
        Object.assign(state, initialState, {
          id: action.payload.id,
          templateName: action.payload.templateName,
          colors: action.payload.colors,
          wishes: action.payload.wishes,
          place: action.payload.place ?? initialState.place,
        });
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishDraft.fulfilled, () => {
        return { ...initialState };
      })
      .addCase(publishDraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(publishDraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(uploadImage.fulfilled, (state, action) => {
        state.coupleImage = action.payload.coupleImage;
        state.place.placeImage =
          action.payload.place?.placeImage ?? state.place.placeImage;
        state.loading = false;
        state.error = null;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resetImage.fulfilled, (state, action) => {
        state.coupleImage = action.payload.coupleImage;
        state.place.placeImage =
          action.payload.place?.placeImage ?? state.place.placeImage;
        state.loading = false;
        state.error = null;
      })
      .addCase(resetImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(resetImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDraft.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          error: null,
          ...action.payload,
          place: action.payload.place ?? state.place,
        };
      })
      .addCase(getDraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(getDraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateDraft.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          place: action.payload.place ?? state.place,
          loading: false,
          error: null,
        };
      })
      .addCase(updateDraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as StateError;
      })
      .addCase(updateDraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { updateLocalDraft, setLastViewedConstructorBlock } =
  draftSlice.actions;
export const draftReducer = draftSlice.reducer;
