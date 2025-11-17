import { FC, useState } from "react";
import { TemplatePlaceProps } from "../../../../types";
import clsx from "clsx";
import { RoundButton } from "../components/RoundButton";

export const Place: FC<TemplatePlaceProps> = ({
  address,
  placeImage,
  scale,
  isMobile,
  link,
}) => {
  const [isRoundButtonHover, setIsRoundButtonHover] = useState<boolean>(false);

  return (
    <div>
      <div
        className={"relative"}
        style={{
          marginBottom: isMobile ? scale(33) : scale(20),
        }}
      >
        <div
          className={"overflow-hidden rounded-20"}
          style={{
            width: isMobile ? scale(330) : scale(390),
            height: isMobile ? scale(330) : scale(390),
          }}
        >
          <img
            className={"h-full w-full object-cover"}
            alt={""}
            src={placeImage}
          />
        </div>
        <div
          className={"absolute flex items-center justify-center"}
          style={{
            width: scale(127),
            height: scale(127),
            bottom: scale(-127 / 2),
            right: scale(14),
          }}
        >
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className={"rounded-full"}
          >
            <RoundButton
              buttonText={
                <p
                  className={
                    "font-nezhnost--secondary font-bold leading-[1.2] text-white"
                  }
                >
                  Как
                  <br />
                  добраться
                </p>
              }
              scale={scale}
              isRoundButtonHover={isRoundButtonHover}
              setIsRoundButtonHover={setIsRoundButtonHover}
            />
          </a>
        </div>
      </div>
      <h2
        className={
          "font-nezhnost--primary font-normal leading-[1.2] text-grey-500"
        }
        style={{ fontSize: scale(32), marginBottom: scale(12) }}
      >
        Место
        <br />
        торжества
      </h2>
      <p
        className={
          "break-all font-nezhnost--secondary font-light leading-[1.6] tracking-[-0.02em] text-grey-500"
        }
        style={{
          fontSize: scale(16),
          maxWidth: isMobile ? scale(330) : scale(394),
        }}
      >
        {address}
      </p>
    </div>
  );
};
