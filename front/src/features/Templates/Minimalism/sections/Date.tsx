import type { FC } from "react";
import { ISO2TextRu } from "../../../../utils/dateUtils";
import type { TemplateDateProps } from "../../../../types";
import { Branches } from "../../../../assets/svg/templates/minimalism/Branches";

export const Date: FC<TemplateDateProps> = ({
  eventDate,
  scale,
  isMobile,
  coupleImage,
}) => {
  const formattedDate = ISO2TextRu(eventDate);
  return (
    <div>
      <div
        className={"flex flex-col"}
        style={{ gap: scale(20), marginBottom: scale(30) }}
      >
        <div
          className={"flex justify-center sm:hidden"}
          style={{
            marginBottom: scale(8),
          }}
        >
          <Branches width={156} />
        </div>
        <h2
          className={
            "text-center font-minimalism--primary font-light leading-[1.2] text-minimalism--primary"
          }
          style={{ fontSize: scale(32) }}
        >
          Дорогие гости!
        </h2>
        <div
          className={
            "flex flex-col [&>p]:text-center [&>p]:font-minimalism--secondary [&>p]:font-light [&>p]:leading-[1.6] [&>p]:tracking-[-0.02em] [&>p]:text-minimalism--primary"
          }
          style={{ gap: scale(8) }}
        >
          <p
            style={{
              fontSize: scale(isMobile ? 14 : 16),
              maxWidth: isMobile ? scale(330) : scale(414),
            }}
          >
            Приглашаем вас вместе с нами отпраздновать прекрасный день нашей
            свадьбы!
          </p>
          <p
            style={{
              fontSize: scale(isMobile ? 14 : 16),
              maxWidth: isMobile ? scale(330) : scale(414),
            }}
          >
            Мы будем рады видеть вас
          </p>
        </div>
        <span
          className={
            "text-center font-minimalism--primary font-light leading-[1.2] text-minimalism--primary"
          }
          style={{ fontSize: scale(32) }}
        >
          {formattedDate}
        </span>
      </div>
      <div
        className={"overflow-hidden rounded-8"}
        style={{
          minWidth: isMobile ? scale(330) : scale(394),
          height: isMobile ? scale(330) : scale(394),
        }}
      >
        <img
          className={"h-full w-full object-cover"}
          alt={""}
          src={coupleImage}
        />
      </div>
    </div>
  );
};
