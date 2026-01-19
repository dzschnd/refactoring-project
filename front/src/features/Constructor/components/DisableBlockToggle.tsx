import type { FC } from "react";
import type { AppDispatch, RootState } from "../../../api/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateDraft } from "../../../api/service/DraftService";
import { updateLocalDraft } from "../../../api/redux/slices/draftSlice";

interface DisableBlockToggleProps {
  blockLink: string;
  isBlockDisabled?: boolean;
  setIsBlockDisabled?: (disabled: boolean) => void;
}
const DisableBlockToggle: FC<DisableBlockToggleProps> = ({
  blockLink,
  isBlockDisabled,
  setIsBlockDisabled,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { id, colors, wishes, prevWishes, prevColors } = useSelector(
    (state: RootState) => state.draft,
  );

  const handleDisableBlock = async () => {
    const linkSplit = blockLink.split("/");

    if (linkSplit[linkSplit.length - 1] === "dresscode") {
      if (isBlockDisabled) {
        await dispatch(
          updateDraft({
            id: id,
            colors: prevColors,
          }),
        );
        dispatch(
          updateLocalDraft({
            colors: prevColors,
          }),
        );
      } else {
        dispatch(
          updateLocalDraft({
            prevColors: colors,
          }),
        );
        await dispatch(
          updateDraft({
            id: id,
            colors: [],
          }),
        );
        dispatch(
          updateLocalDraft({
            colors: null,
          }),
        );
      }
    } else if (linkSplit[linkSplit.length - 1] === "wishes") {
      if (isBlockDisabled) {
        await dispatch(
          updateDraft({
            id: id,
            wishes: prevWishes,
          }),
        );
        dispatch(
          updateLocalDraft({
            wishes: prevWishes,
          }),
        );
      } else {
        dispatch(
          updateLocalDraft({
            prevWishes: wishes,
          }),
        );
        await dispatch(
          updateDraft({
            id: id,
            wishes: [],
          }),
        );
        dispatch(
          updateLocalDraft({
            wishes: null,
          }),
        );
      }
    }

    if (setIsBlockDisabled) setIsBlockDisabled(!isBlockDisabled);
  };

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        autoComplete={"off"}
        checked={isBlockDisabled}
        onChange={handleDisableBlock}
        type="checkbox"
        className="peer sr-only"
      />
      <div className="peer relative h-[20px] w-[36px] rounded-full bg-red-100 shadow-toggle-ball after:absolute after:left-[3px] after:top-[3px] after:h-[14px] after:w-[14px] after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4"></div>
    </label>
  );
};

export default DisableBlockToggle;
