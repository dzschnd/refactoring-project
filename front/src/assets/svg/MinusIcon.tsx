import type { FC } from "react";

type MinusIconProps = Record<string, never>;

export const MinusIcon: FC<MinusIconProps> = (_props) => {
  return (
    <div className={"min-w-[15px]"}>
      <svg
        width="15"
        height="15"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 8H16" stroke="#A10F04" stroke-linecap="round" />
      </svg>
    </div>
  );
};
