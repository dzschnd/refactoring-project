import { FC } from "react";
import { TemplateProgramProps } from "../../../../types";

export const Program: FC<TemplateProgramProps> = ({
  planItems,
  scale,
  isMobile,
}) => {
  return (
    <div>
      <h2
        className={
          "text-minimalism--primary text-center font-minimalism--primary font-light leading-[1.2]"
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
              "[&>span]:text-minimalism--primary flex flex-col items-center [&>span]:font-light"
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
                "font-minimalism--tertiary break-words leading-[1.6] tracking-[-0.02em]"
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
