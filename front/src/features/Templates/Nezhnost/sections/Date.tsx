import type { FC } from "react";
import { ISO2TextRu } from "../../../../utils/dateUtils";
import type { TemplateDateProps } from "../../../../types";

export const Date: FC<TemplateDateProps> = ({ eventDate, scale, isMobile }) => {
  const formattedDate = ISO2TextRu(eventDate);
  return (
    <div className={"flex flex-col"} style={{ gap: scale(20) }}>
      <h2
        className={
          "text-center font-nezhnost--primary font-normal leading-[1.2] text-grey-500"
        }
        style={{ fontSize: scale(32) }}
      >
        Дорогие гости!
      </h2>
      <p
        className={
          "text-center font-nezhnost--secondary font-light leading-[1.6] tracking-[-0.02em] text-grey-500"
        }
        style={{
          fontSize: scale(16),
          maxWidth: isMobile ? scale(330) : scale(414),
        }}
      >
        В нашей жизни предстоят счастливые перемены! Мы хотим, чтобы в этот день
        рядом с нами были близкие и дорогие для нас люди. Будем рады разделить с
        вами в день нашей свадьбы, которая состоится:
      </p>
      <span
        className={
          "text-center font-nezhnost--primary font-normal leading-[1.2] text-grey-500"
        }
        style={{ fontSize: scale(32) }}
      >
        {formattedDate}
      </span>
    </div>
  );
};
