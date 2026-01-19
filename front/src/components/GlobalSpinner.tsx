import type { FC } from "react";
import { useAppSelector } from "../api/redux/hooks";
import Loader from "./Loader";

const GlobalSpinner: FC = () => {
  const pending = useAppSelector((state) => state.ui.pendingRequests);

  if (pending <= 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
      <div className="rounded-20 bg-white px-6 py-4 shadow-header">
        <div className="flex items-center gap-3">
          <Loader />
          <span className="text-300 font-medium text-grey-500">
            Загрузка...
          </span>
        </div>
      </div>
    </div>
  );
};

export default GlobalSpinner;
