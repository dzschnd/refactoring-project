import type { FC } from "react";

type ButtonProps = {
  buttonText: string;
  scale: (value: number) => string;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({ disabled, buttonText, scale }) => {
  return (
    <button
      disabled={disabled}
      className={
        "w-full rounded-8 border border-minimalism--primary bg-minimalism--primary font-minimalism--tertiary font-medium leading-[1.2] text-minimalism--secondary hover:bg-minimalism--tertiary"
      }
      style={{ fontSize: scale(16), paddingBlock: scale(12) }}
    >
      {buttonText}
    </button>
  );
};
