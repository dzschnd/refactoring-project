import type { FC } from "react";
import clsx from "clsx";

const Button: FC<{
  message: string;
  type?: "button" | "submit" | "reset";
  borderRadius: number;
  onClick?: () => void;
  inverted?: boolean;
  className?: string;
}> = ({ message, type, borderRadius, onClick, inverted, className }) => {
  return (
    <button
      type={type ?? "button"}
      className={clsx(
        `rounded-[${borderRadius}px] border border-primary text-300 font-semibold`,
        inverted
          ? "bg-primary text-white hover:bg-primary-700"
          : "text-primary hover:bg-primary hover:text-white",
        className,
      )}
      onClick={onClick}
    >
      {message}
    </button>
  );
};

export default Button;
