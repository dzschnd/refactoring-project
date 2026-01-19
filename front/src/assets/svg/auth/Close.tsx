import type { FC } from "react";

type closeProps = Record<string, never>;

export const Close: FC<closeProps> = (_props) => {
  return (
    <div
      className={
        "flex h-[30px] w-[30px] items-center justify-center rounded-full bg-grey-50"
      }
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.5618 9.43789C21.0499 9.92605 21.0499 10.7175 20.5618 11.2057L16.7674 15.0001L20.5618 18.7945C21.0499 19.2826 21.0499 20.0741 20.5618 20.5623C20.0736 21.0504 19.2822 21.0504 18.794 20.5623L14.9996 16.7678L11.2052 20.5623C10.717 21.0504 9.92556 21.0504 9.43741 20.5623C8.94925 20.0741 8.94925 19.2826 9.43741 18.7945L13.2318 15.0001L9.43741 11.2057C8.94925 10.7175 8.94925 9.92605 9.43741 9.43789C9.92556 8.94974 10.717 8.94974 11.2052 9.43789L14.9996 13.2323L18.794 9.43789C19.2822 8.94974 20.0736 8.94974 20.5618 9.43789Z"
          fill="#383838"
        />
      </svg>
    </div>
  );
};
