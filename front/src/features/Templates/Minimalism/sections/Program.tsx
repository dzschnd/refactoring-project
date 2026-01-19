import type { FC } from "react";
import type { TemplateProgramProps } from "../../../../types";

export const Program: FC<TemplateProgramProps> = ({
  planItems,
  scale,
  isMobile: _isMobile,
}) => {
  return (
    <div>
      <h2
        className={
          "text-center font-minimalism--primary font-light leading-[1.2] text-minimalism--primary"
        }
        style={{ marginBottom: scale(30), fontSize: scale(32) }}
      >
        Программа
      </h2>

      <div className={"flex flex-col"} style={{ gap: scale(24) }}>
        {planItems?.map((item, index) => (
          <div
            key={index}
            className={
              "flex flex-col items-center [&>span]:font-light [&>span]:text-minimalism--primary"
            }
            style={{ gap: scale(12) }}
          >
            <span
              className={
                "font-minimalism--primary leading-[1.2] tracking-[0.05em]"
              }
              style={{ fontSize: scale(24) }}
            >
              {item.eventTime}
            </span>
            <span
              className={
                "break-words font-minimalism--tertiary leading-[1.6] tracking-[-0.02em]"
              }
              style={{ fontSize: scale(16) }}
            >
              {item.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
