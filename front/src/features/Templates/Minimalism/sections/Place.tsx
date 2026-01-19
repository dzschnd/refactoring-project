import type { FC } from "react";
import type { TemplatePlaceProps } from "../../../../types";
import { Button } from "../components/Button";

export const Place: FC<TemplatePlaceProps> = ({
  address,
  placeImage,
  scale,
  isMobile,
  link,
}) => {
  return (
    <div className={"flex flex-col"} style={{ gap: scale(30) }}>
      <div className={"flex flex-col"} style={{ gap: scale(12) }}>
        <h2
          className={
            "text-center font-minimalism--primary font-light leading-[1.2] text-minimalism--primary"
          }
          style={{ fontSize: scale(32) }}
        >
          Локация
        </h2>
        <p
          className={
            "break-words text-center font-minimalism--secondary font-light leading-[1.6] tracking-[-0.02em] text-minimalism--primary"
          }
          style={{
            fontSize: scale(16),
            maxWidth: isMobile ? scale(330) : scale(394),
          }}
        >
          {address}
        </p>
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
          src={placeImage}
        />
      </div>

      <a href={link} target="_blank" rel="noreferrer">
        <Button buttonText={"Как добраться"} scale={scale} />
      </a>
    </div>
  );
};
