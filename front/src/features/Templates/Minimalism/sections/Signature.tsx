import { FC } from "react";
import { TemplateMinimalProps } from "../../../../types";
import { Branches } from "../../../../assets/svg/templates/minimalism/Branches";

export const Signature: FC<TemplateMinimalProps> = ({ isMobile, scale }) => {
  return (
    <div
      className={"flex flex-col items-center justify-center"}
      style={{ gap: scale(16), marginBottom: isMobile ? 0 : scale(28) }}
    >
      <h2
        className={
          "font-minimalism--primary font-light leading-[1.2] text-minimalism--primary"
        }
        style={{ fontSize: scale(32) }}
      >
        Будем Вас ждать!
      </h2>
      <Branches width={109} />
    </div>
  );
};
