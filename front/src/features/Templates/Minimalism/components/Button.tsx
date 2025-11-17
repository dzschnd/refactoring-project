import { FC } from "react";

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
        "font-minimalism--tertiary hover:bg-minimalism--tertiary border-minimalism--primary bg-minimalism--primary text-minimalism--secondary w-full rounded-8 border font-medium leading-[1.2]"
      }
      style={{ fontSize: scale(16), paddingBlock: scale(12) }}
    >
      {buttonText}
    </button>
  );
};
