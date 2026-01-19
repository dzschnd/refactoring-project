import type { FC } from "react";
import type { TemplateProgramProps } from "../../../../types";

export const Program: FC<TemplateProgramProps> = ({
  planItems,
  scale,
  isMobile,
}) => {
  return (
    <div
      className={"rounded-[12px] bg-[#C8D7E5]"}
      style={{
        padding: isMobile ? scale(30) : scale(64.5),
        maxWidth: isMobile ? scale(330) : scale(394),
      }}
    >
      <h2
        className={
          "text-center font-nezhnost--primary font-normal leading-[1.2] text-grey-500"
        }
        style={{ marginBottom: scale(30), fontSize: scale(32) }}
      >
        Программа
      </h2>
      <div className={"flex flex-col"} style={{ gap: scale(24) }}>
        {planItems?.map((item, index) => (
          <div
            key={index}
            className={"flex items-center"}
            style={{ gap: scale(20) }}
          >
            <span
              className={
                "font-nezhnost--tertiary font-normal uppercase leading-[1.2] tracking-[0.05em] text-grey-500"
              }
              style={{ fontSize: scale(24) }}
            >
              {item.eventTime}
            </span>
            <span
              className={
                "break-all font-nezhnost--secondary font-light leading-[1.6] tracking-[-0.02em]"
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
