import { FC } from "react";

type ArrowIconProps = {
  right?: boolean;
};

export const ArrowIcon: FC<ArrowIconProps> = ({ right }) => {
  return (
    <div className={`h-[9px] w-[21px] ${right && "rotate-180 transform"}`}>
      <svg
        width="21"
        height="9"
        viewBox="0 0 21 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.5 5C20.7761 5 21 4.77614 21 4.5C21 4.22386 20.7761 4 20.5 4L20.5 5ZM0.146446 4.14644C-0.0488148 4.34171 -0.0488148 4.65829 0.146446 4.85355L3.32843 8.03553C3.52369 8.23079 3.84027 8.23079 4.03553 8.03553C4.2308 7.84027 4.2308 7.52369 4.03553 7.32843L1.20711 4.5L4.03553 1.67157C4.2308 1.47631 4.2308 1.15973 4.03553 0.964465C3.84027 0.769202 3.52369 0.769202 3.32843 0.964465L0.146446 4.14644ZM20.5 4L0.5 4L0.5 5L20.5 5L20.5 4Z"
          fill="white"
        />
      </svg>
    </div>
  );
};
