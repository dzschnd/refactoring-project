import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../api/redux/hooks";
import { createDraft } from "../api/service/DraftService";
import { defaultTemplateName } from "../constants";
import type { StateError } from "../types";
import { openAuthModal } from "./authModal";

const useCreateDefaultDraft = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return async () => {
    const response = await dispatch(
      createDraft({ templateName: defaultTemplateName }),
    );
    const error = response.payload as StateError | undefined;
    if (
      error?.status === 403 ||
      error?.status === 401 ||
      error?.message === "Forbidden"
    ) {
      openAuthModal();
      return;
    }
    if (response.meta?.requestStatus === "fulfilled") {
      navigate("/constructor/names");
    }
  };
};

export default useCreateDefaultDraft;
