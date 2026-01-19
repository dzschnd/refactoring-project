import type { FC } from "react";

type ArrowIconProps = {
  right?: boolean;
  styleDisabled?: boolean;
};

export const ArrowIcon: FC<ArrowIconProps> = ({ right, styleDisabled }) => {
  return (
    <div className={`${right && "rotate-180 transform"}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 11.4C19.3314 11.4 19.6 11.6686 19.6 12C19.6 12.3314 19.3314 12.6 19 12.6V11.4ZM6.57574 12.4243C6.34142 12.1899 6.34142 11.8101 6.57574 11.5757L10.3941 7.75736C10.6284 7.52304 11.0083 7.52304 11.2426 7.75736C11.477 7.99167 11.477 8.37157 11.2426 8.60589L7.84853 12L11.2426 15.3941C11.477 15.6284 11.477 16.0083 11.2426 16.2426C11.0083 16.477 10.6284 16.477 10.3941 16.2426L6.57574 12.4243ZM19 12V12.6H7V12V11.4H19V12Z"
          fill={styleDisabled ? "#ACACAD" : "#A10F04"}
        />
      </svg>
    </div>
  );
};
