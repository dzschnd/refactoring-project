import type { FC } from "react";

type SparkProps = Record<string, never>;

export const SparkIcon: FC<SparkProps> = (_props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 6.71477C10.7557 7.4861 8.21833 10.0121 7.43239 13.2529L7.2512 14L7.18547 13.729C6.33149 10.2076 3.54093 7.48357 6.60162e-07 6.71477L0.267673 6.65665C3.65833 5.92048 6.35346 3.3515 7.2512 -2.94999e-07L7.30709 0.208652C8.17327 3.44231 10.7431 5.94045 14 6.71477Z"
        fill="#A10F04"
      />
    </svg>
  );
};
