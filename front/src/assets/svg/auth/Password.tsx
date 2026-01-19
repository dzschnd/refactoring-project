import type { FC } from "react";

type PasswordProps = Record<string, never>;

export const Password: FC<PasswordProps> = (_props) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 9.5L10.5 15.5M10.5 9.5L13.5 15.5M9.75 12.5H14.25M6.75 9.50006L3.75 15.5001M3.75 9.50006L6.75 15.5001M3 12.5001H7.5M20.25 9.50006L17.25 15.5001M17.25 9.50006L20.25 15.5001M16.5 12.5001H21"
        stroke="#848484"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
