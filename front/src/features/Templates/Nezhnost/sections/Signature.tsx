import type { FC } from "react";
import type { TemplateMinimalProps } from "../../../../types";

export const Signature: FC<TemplateMinimalProps> = ({ scale }) => {
  return (
    <h2
      className={
        "text-center font-nezhnost--primary font-normal leading-[1.2] text-grey-500"
      }
      style={{ fontSize: scale(32) }}
    >
      Будем Вас ждать!
    </h2>
  );
};
