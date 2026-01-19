import { useState } from "react";
import type { FC } from "react";
import type { TemplateWishesProps } from "../../../../types";
import { ArrowIcon } from "../../../../assets/svg/templates/nezhnost/ArrowIcon";
import clsx from "clsx";

export const Wishes: FC<TemplateWishesProps> = ({
  wishes,
  scale,
  isMobile,
}) => {
  const [currentWishIndex, setCurrentWishIndex] = useState<number>(0);

  return (
    <div
      className={"flex min-w-full flex-col items-center bg-minimalism--primary"}
      style={{
        gap: scale(20),
        paddingBlock: scale(29),
        marginInline: scale(-15),
      }}
    >
      <h2
        className={
          "font-minimalism--primary font-light leading-[1.2] text-white"
        }
        style={{ fontSize: scale(32) }}
      >
        Пожелания
      </h2>
      <div className={"flex"}>
        {wishes?.map((item, index) => (
          <p
            key={index}
            className={clsx(
              "break-words text-center font-minimalism--secondary font-normal leading-[1.4] tracking-[-0.02em] text-white",
              item.position !== currentWishIndex && "invisible",
            )}
            style={{
              transform: `translateX(${(Math.ceil(wishes?.length / 2) - (item.position + (wishes?.length % 2 === 0 ? 0.5 : 1))) * 100}%)`,
              width: isMobile ? scale(330) : scale(394),
              fontSize: scale(16),
            }}
          >
            {item.wish}
          </p>
        ))}
      </div>
      <div className={"flex items-center"} style={{ gap: scale(16) }}>
        <button
          disabled={currentWishIndex === 0}
          onClick={() => setCurrentWishIndex(currentWishIndex - 1)}
        >
          <ArrowIcon />
        </button>
        <div
          className={
            "flex [&>*]:font-minimalism--secondary [&>*]:font-normal [&>*]:leading-[1.2] [&>*]:text-white"
          }
          style={{ fontSize: scale(16), gap: scale(10) }}
        >
          <span>{currentWishIndex + 1}</span>
          <span>/</span>
          <span>{wishes?.length}</span>
        </div>
        <button
          disabled={wishes !== null && currentWishIndex === wishes.length - 1}
          onClick={() => setCurrentWishIndex(currentWishIndex + 1)}
        >
          <ArrowIcon right />
        </button>
      </div>
    </div>
  );
};
