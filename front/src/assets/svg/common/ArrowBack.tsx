import type { FC } from "react";

type ArrowBackProps = Record<string, never>;

export const ArrowBack: FC<ArrowBackProps> = (_props) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.4965 12.4947L14.2435 8.74782C14.6573 8.33401 14.6573 7.66309 14.2435 7.24928C13.8297 6.83546 13.1587 6.83546 12.7449 7.24928L7.5 12.4942L12.7555 17.7506C13.1692 18.1645 13.8402 18.1645 14.254 17.7507C14.6678 17.3369 14.6678 16.666 14.254 16.2522L10.4965 12.4947Z"
        fill="#A10F04"
      />
    </svg>
  );
};
