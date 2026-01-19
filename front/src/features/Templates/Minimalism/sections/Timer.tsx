import { useEffect, useState } from "react";
import type { FC } from "react";
import type { TemplateTimerProps } from "../../../../types";
import { getTimeUntilDate } from "../../../../utils/dateUtils";
import { defaultTemplateImages } from "../../defaultTemplateImages";

export const Timer: FC<TemplateTimerProps> = ({
  eventDate,
  scale,
  isMobile,
}) => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilDate(eventDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeUntilDate(eventDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, eventDate]);

  return (
    <div className={"relative"}>
      <img
        src={defaultTemplateImages.minimalismTimerImage}
        alt={""}
        className={"rounded-8"}
        style={{
          width: isMobile ? scale(330) : scale(392),
          height: isMobile ? scale(330) : scale(392),
        }}
      />
      <div
        className={"absolute inset-0 flex justify-center"}
        style={{ paddingInline: scale(42), paddingBlock: scale(125) }}
      >
        <div
          className={"flex items-center"}
          style={{ gap: scale(12), width: scale(291) }}
        >
          <div className={"flex flex-col"} style={{ gap: scale(6) }}>
            <span
              className={
                "font-minimalism--primary font-light leading-[1.2] text-white"
              }
              style={{ fontSize: scale(40) }}
            >
              {timeLeft.days}
            </span>
            <span
              className={
                "font-minimalism--tertiary font-light leading-[1.6] tracking-[-0.02] text-white"
              }
              style={{ fontSize: scale(16) }}
            >
              дней
            </span>
          </div>
          <span
            className={
              "font-minimalism--primary font-light leading-[1.2] text-white"
            }
            style={{ fontSize: scale(32) }}
          >
            :
          </span>
          <div className={"flex flex-col"} style={{ gap: scale(6) }}>
            <span
              className={
                "font-minimalism--primary font-light leading-[1.2] text-white"
              }
              style={{ fontSize: scale(40) }}
            >
              {timeLeft.hours}
            </span>
            <span
              className={
                "font-minimalism--tertiary font-light leading-[1.6] tracking-[-0.02] text-white"
              }
              style={{ fontSize: scale(16) }}
            >
              час
            </span>
          </div>
          <span
            className={
              "font-minimalism--primary font-light leading-[1.2] text-white"
            }
            style={{ fontSize: scale(32) }}
          >
            :
          </span>
          <div className={"flex flex-col"} style={{ gap: scale(6) }}>
            <span
              className={
                "font-minimalism--primary font-light leading-[1.2] text-white"
              }
              style={{ fontSize: scale(40) }}
            >
              {timeLeft.minutes}
            </span>
            <span
              className={
                "font-minimalism--tertiary font-light leading-[1.6] tracking-[-0.02] text-white"
              }
              style={{ fontSize: scale(16) }}
            >
              мин
            </span>
          </div>
          <span
            className={
              "font-minimalism--primary font-light leading-[1.2] text-white"
            }
            style={{ fontSize: scale(32) }}
          >
            :
          </span>
          <div className={"flex flex-col"} style={{ gap: scale(6) }}>
            <span
              className={
                "font-minimalism--primary font-light leading-[1.2] text-white"
              }
              style={{ fontSize: scale(40) }}
            >
              {timeLeft.seconds}
            </span>
            <span
              className={
                "font-minimalism--tertiary font-light leading-[1.6] tracking-[-0.02] text-white"
              }
              style={{ fontSize: scale(16) }}
            >
              сек
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
