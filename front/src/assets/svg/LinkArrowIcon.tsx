import type { FC } from "react";

type LinkArrowProps = {
  inverted?: boolean;
  dark?: boolean;
};

export const LinkArrowIcon: FC<LinkArrowProps> = ({ inverted, dark }) => {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11.5L11 1.5"
        stroke={inverted ? (dark ? "#890900" : "#A10F04") : "#FFFFFF"}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M11 11.5L11 1.5"
        stroke={inverted ? (dark ? "#890900" : "#A10F04") : "#FFFFFF"}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M1 1.5L11 1.5"
        stroke={inverted ? (dark ? "#890900" : "#A10F04") : "#FFFFFF"}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};
