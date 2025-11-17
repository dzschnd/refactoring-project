import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../api/redux/store";
import { createDraft } from "../api/service/DraftService";
import { defaultTemplateName } from "../constants";

const useCreateDefaultDraft = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return async () => {
    const response = await dispatch(
      createDraft({ templateName: defaultTemplateName }),
    );
    if (response.payload?.status === 403) {
      navigate("/login");
      return;
    }
    if (response.meta?.requestStatus === "fulfilled") {
      navigate("/constructor/names");
    }
  };
};

export default useCreateDefaultDraft;
