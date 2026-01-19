import type { FC } from "react";
import clsx from "clsx";

export const TabButton: FC<{
  message: string;
  onClick?: () => void;
  isSelected: boolean;
  className?: string;
}> = ({ message, onClick, isSelected, className }) => {
  return (
    <button
      disabled={isSelected}
      className={clsx(
        "h-[36px] rounded-42 border border-primary text-300 font-normal leading-[24px] hover:bg-white",
        (!isSelected &&
          "border-primary-100 text-primary-100 hover:border-primary-100 hover:text-primary-100") ||
          "text-primary hover:text-primary",
        className,
      )}
      onClick={onClick}
    >
      {message}
    </button>
  );
};
