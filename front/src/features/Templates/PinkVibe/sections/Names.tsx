import { useRef } from "react";
import type { FC } from "react";
import type { TemplateNamesProps } from "../../../../types";
import { useScaleTextToFit } from "../../../../hooks/useScaleTextToFit";
import clsx from "clsx";
import { Heart } from "../../../../assets/svg/templates/pinkVibe/Heart";

export const Names: FC<TemplateNamesProps> = ({
  firstPartnerName,
  secondPartnerName,
  scale,
  isMobile,
  coupleImage,
}) => {
  const range = (count: number) =>
    Array.from({ length: count }, (_, idx) => idx);

  const scaleToNumber = (value: number) => {
    return parseFloat(scale(value).replace("px", ""));
  };

  const namesTextRef = useRef<HTMLHeadingElement>(null);

  const namesFontSize = useScaleTextToFit({
    textRef: namesTextRef,
    maxWidth: isMobile ? scaleToNumber(330) : scaleToNumber(598),
    scaleToNumber: scaleToNumber,
    texts: [firstPartnerName, secondPartnerName],
    baseFontSize: 32,
  });

  const fullWidthRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div
        ref={fullWidthRef}
        className={"absolute left-0 right-0 top-0 overflow-x-hidden bg-white"}
        style={{ height: scale(24) }}
      >
        <div className={"flex h-full"}>
          {range(2).map((idx) => (
            <div
              key={idx}
              className={"flex h-full animate-marquee items-center"}
              style={{ gap: scale(6), paddingInline: scale(3) }}
            >
              {range(
                fullWidthRef && fullWidthRef.current
                  ? Math.ceil(fullWidthRef.current.clientWidth / 130)
                  : 5,
              ).map((itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex items-center"
                  style={{ gap: scale(6) }}
                >
                  <Heart />
                  <span
                    className="text-nowrap font-pink-vibe--secondary font-semibold leading-[1.2] text-pink-vibe--primary"
                    style={{ fontSize: scale(10) }}
                  >
                    Приглашение на свадьбу
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex flex-col items-center"
        style={{
          marginTop: isMobile ? scale(84) : scale(104),
          marginBottom: scale(12),
        }}
      >
        <h1
          ref={namesTextRef}
          className={clsx(
            "flex flex-wrap justify-center overflow-x-hidden text-center [&>*]:font-pink-vibe--primary [&>*]:font-semibold [&>*]:leading-[1.2] [&>*]:text-pink-vibe-neutral-100",
          )}
          style={{
            fontSize: namesFontSize,
            gap: scale(12),
            maxWidth: isMobile ? scale(330) : scale(598),
            whiteSpace: "nowrap",
          }}
        >
          <span>{secondPartnerName}</span>
          <span>и</span>
          <span>{firstPartnerName}</span>
        </h1>
      </div>
      <div
        className="overflow-hidden rounded-20"
        style={{
          width: isMobile ? scale(330) : scale(394),
          height: isMobile ? scale(450) : scale(500),
          marginBottom: scale(16),
        }}
      >
        <img className="h-full w-full object-cover" alt="" src={coupleImage} />
      </div>
      <div className={"mx-auto flex justify-center"} style={{ gap: scale(12) }}>
        {range(3).map((idx) => (
          <Heart key={idx} width={16} height={14} inverted />
        ))}
      </div>
    </div>
  );
};
