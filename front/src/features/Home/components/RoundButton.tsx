import type { FC } from "react";
import { LinkArrowIcon } from "../../../assets/svg/LinkArrowIcon";

type RoundButtonProps = {
  message: string;
  onClick?: () => void;
  className?: string;
};

const RoundButton: FC<RoundButtonProps> = ({
  message,
  onClick,
  className,
}: RoundButtonProps) => {
  return (
    <div
      className={`h-[133px] w-[133px] rounded-full border border-neutral-100 sm:h-[138.95px] sm:w-[138.95px] md:h-[165px] md:w-[165px] ${className}`}
    >
      <button
        onClick={onClick}
        className={
          "flex h-full w-full items-center justify-center gap-[7px] rounded-full bg-primary hover:bg-primary-700"
        }
      >
        <p
          className={
            "max-w-[110px] text-300 font-semibold uppercase text-white"
          }
        >
          {message}
        </p>
        <LinkArrowIcon />
      </button>
    </div>
  );
};

export default RoundButton;
