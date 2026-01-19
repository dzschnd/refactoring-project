import type { FC } from "react";

type PlusIconProps = Record<string, never>;

export const PlusIcon: FC<PlusIconProps> = (_props) => {
  return (
    <div className={"min-w-[15px]"}>
      <svg
        width="15"
        height="15"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 8.5H16M8.5 16L8.5 1"
          stroke="#A10F04"
          stroke-linecap="round"
        />
      </svg>
    </div>
  );
};
