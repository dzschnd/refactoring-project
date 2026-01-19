import type { FC } from "react";

type BurgerMenuProps = Record<string, never>;

export const BurgerMenuIcon: FC<BurgerMenuProps> = (_props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 8H17"
        stroke="#A10F04"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 12H17"
        stroke="#A10F04"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 16H17"
        stroke="#A10F04"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
