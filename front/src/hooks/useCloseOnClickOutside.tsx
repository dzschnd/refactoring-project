import { useEffect, RefObject, Dispatch, SetStateAction } from "react";

export function useCloseOnClickOutside({
  popupRef,
  setIsPopupOpenAction,
}: {
  popupRef: RefObject<HTMLDivElement | null>;
  setIsPopupOpenAction: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef?.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpenAction(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, setIsPopupOpenAction]);

  return;
}
