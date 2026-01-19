import { useEffect } from "react";
import type { FC } from "react";
import { useAppDispatch, useAppSelector } from "../api/redux/hooks";
import { clearError } from "../api/redux/slices/uiSlice";

const ErrorToast: FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.ui.lastError);

  useEffect(() => {
    if (!error) return;
    const timeout = setTimeout(() => dispatch(clearError()), 6000);
    return () => clearTimeout(timeout);
  }, [dispatch, error]);

  if (!error) return null;

  return (
    <div className="fixed left-1/2 top-6 z-50 w-[min(90vw,420px)] -translate-x-1/2 rounded-16 bg-red-100 px-4 py-3 shadow-header">
      <div className="flex items-start justify-between gap-3">
        <div className="text-300 text-red-700">
          {error.message || "Произошла ошибка"}
        </div>
        <button
          onClick={() => dispatch(clearError())}
          className="text-200 font-semibold text-red-700"
          aria-label="close error"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorToast;
