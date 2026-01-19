import type { FC } from "react";
import type { TemplateMinimalProps } from "../../../../types";
import { Logo } from "../../../../assets/svg/Logo";

export const MadeBy: FC<TemplateMinimalProps> = ({ scale }) => {
  return (
    <div
      className={"flex items-center justify-center bg-[#1E1E1E]"}
      style={{
        minHeight: scale(24),
        gap: scale(4),
        minWidth: `calc(100% + ${scale(30)})`,
      }}
    >
      <span
        className={"font-primary font-normal leading-[1.2] text-white"}
        style={{ fontSize: scale(12), height: scale(14) }}
      >
        Made by
      </span>
      <Logo
        desktopWidth={parseFloat(scale(63).replace("px", ""))}
        width={parseFloat(scale(63).replace("px", ""))}
        inverted
      />
    </div>
  );
};
