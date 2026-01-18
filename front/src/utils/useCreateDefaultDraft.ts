import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../api/redux/store";
import { createDraft } from "../api/service/DraftService";
import { defaultTemplateName } from "../constants";
import type { StateError } from "../types";

const useCreateDefaultDraft = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return async () => {
    const response = await dispatch(
      createDraft({ templateName: defaultTemplateName }),
    );
    const error = response.payload as StateError | undefined;
    if (error?.status === 403) {
      navigate("/login");
      return;
    }
    if (response.meta?.requestStatus === "fulfilled") {
      navigate("/constructor/names");
    }
  };
};

export default useCreateDefaultDraft;
