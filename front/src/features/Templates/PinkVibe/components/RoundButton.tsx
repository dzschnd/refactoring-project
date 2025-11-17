import { FC, ReactNode } from "react";
import clsx from "clsx";

type RoundButtonProps = {
  buttonText: ReactNode;
  scale: (value: number) => string;
  isRoundButtonHover: boolean;
  setIsRoundButtonHover: (value: boolean) => void;
  disabled?: boolean;
};

export const RoundButton: FC<RoundButtonProps> = ({
  disabled,
  buttonText,
  isRoundButtonHover,
  setIsRoundButtonHover,
  scale,
}) => {
  return (
    <button
      disabled={disabled}
      onMouseOver={() => setIsRoundButtonHover(true)}
      onMouseLeave={() => setIsRoundButtonHover(false)}
      className={clsx(
        "flex items-center justify-center rounded-full bg-[#D2A69D4D] transition-all duration-300 ease-in-out",
      )}
      style={{
        width: scale(isRoundButtonHover ? 127 : 115),
        height: scale(isRoundButtonHover ? 127 : 115),
      }}
    >
      <div
        className={"flex items-center justify-center rounded-full bg-[#D2A69D]"}
        style={{
          width: scale(115),
          height: scale(115),
          fontSize: scale(14),
        }}
      >
        {buttonText}
      </div>
    </button>
  );
};
